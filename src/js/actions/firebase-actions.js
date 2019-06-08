import * as actions from './action-types'
import * as _ from 'lodash'
import { push } from 'connected-react-router'
import { loadProjectIndices } from './firebase-fid-actions';

export const NEW_PROJECT_CREATED = 'NEW_PROJECT_CREATED'
export const USER_DETAILS_FETCHED = 'USER_DETAILS_FETCHED'
export const COMPANY_DETAILS_FETCHED = 'COMPANY_DETAILS_FETCHED'

export const addUserToProjectData = (projectData, user) => {
    const newProjectData = _.merge({}, projectData)
    newProjectData.metadata.users = [user.uid]
    return newProjectData
}

export const saveNewProjectToDb = (projectData, navigateWhenDone = true) => (dispatch, getState) => {
    const db = getState().firebase.db

    projectData = addUserToProjectData(projectData, getState().users.user)

    db.collection(projectData.projectType)
        .add(projectData)
        .then(docRef => {
            console.log(`Created new ${projectData.projectType} project at ${docRef.id}`)
            dispatch({
                type: NEW_PROJECT_CREATED,
                projectData: projectData,
                projectId: docRef.id
            })
            dispatch(loadProjectIndices())

            if (navigateWhenDone) dispatch(push(`/${projectData.projectType}/${docRef.id}`))
        })
}

export const updateAtexProjectDataField = projectId => (dispatch, getState) => {
    const fields = getState().releaseRate.atexProjects[projectId].fields

    getState().firebase.db
        .collection('atex')
        .doc(projectId)
        .update({ fields: fields })
        .then(() => {
            dispatch({
                type: actions.ATEX_PROJECT_DATA_SAVED,
                projectId, fields
            })
        })
        .catch(error => {
            console.log('ERROR: Could not update ATEX data for project', projectId, 'Result:', error)
        })
}

export const fetchAtexProjectData = projectId => (dispatch, getState) => {
    const db = getState().firebase.db

    db.collection('atex')
        .doc(projectId)
        .get()
        .then(doc => {
            if (doc.exists) {
                dispatch({
                    type: actions.ATEX_PROJECT_DATA_FETCHED,
                    projectData: _.merge({}, doc.data(), { projectId }),
                    projectId: projectId,
                })
            } else {
                dispatch({
                    type: actions.ATEX_PROJECT_NOT_FOUND,
                    projectId: projectId
                })
            }
        })
}

export const submitReleaseRateCalculation = atexProject => (dispatch, getState) => {
    const db = getState().firebase.db
    const { projectId } = atexProject
    const userId = getState().users.user.uid
    const timeStamp = new Date().getTime() // May have to update this since firebase has introduced the Timestamp interface

    const createResultListener = resultId => {
        // Attach a listener to this document. When the calculation is done, the pdf will be uploaded there
        const unsubscribe = db
            .collection('results')
            .doc(resultId)
            .collection('report')
            .doc('pdf')
            .onSnapshot(doc => {
                if (doc.exists) {
                    dispatch({
                        type: actions.ATEX_REPORT_LINK_RECEIVED,
                        url: doc.data().reportPath
                    })
                    unsubscribe()
                }
            })
    }

    // This is what we do:
    // 1. Upload the id to /atexRequests/{id}/...
    // 2. Create a listener to /results/{id}/reports/pdf
    // The server will listen for changes in /atexRequests/ and write the results back to /results/...
    db.collection('atexRequests')
        .add({
            id: projectId,
            timeStamp, userId
        })
        .then(ref => createResultListener(ref.id))
        .catch(error => {
            console.error("Error adding document: ", error)
        })
}

export const storeUserFeedback = (feedback, user) => {
    return (dispatch, getState) => {
        const db = getState().firebase.db
        const feedbackData = {
            feedback,
            user,
            timestamp: new Date().getTime(),
            feedbackTyp: 'undefined'
        }
        db.collection('userFeedback').add(feedbackData)
    }
}

export const loadElements = () => {
    return (dispatch, getState) => {
        const db = getState().firebase.db
        const elements = {}
        db.collection('elements').get().then(snapShot => {
            snapShot.docs.forEach(doc => {
                elements[doc.id] = doc.data()
            })

            dispatch({
                type: actions.ELEMENTS_FETCHED,
                data: elements
            })
        })
    }
}

export const loadUserDetails = user => {
    return (dispatch, getState) => {
        const db = getState().firebase.db
        db
            .collection('users')
            .doc(user.uid)
            .get()
            .then(doc => {
                dispatch({
                    type: USER_DETAILS_FETCHED,
                    userDetails: doc.data()
                })
            })
    }
}

export const loadCompaniesForUser = user => {
    return (dispatch, getState) => {
        const db = getState().firebase.db
        db
            .collection('customers')
            .where(`users`, "array-contains", user.uid)
            .get()
            .then(snapShot => {
                dispatch({
                    type: COMPANY_DETAILS_FETCHED,
                    companies: _.map(snapShot.docs, company => company.data())
                })
            })
    }
}