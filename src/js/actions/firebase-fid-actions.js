import * as _ from '../../../node_modules/lodash/lodash.min'

export const saveProjectToDb = projectData => {
    return {
        type: 'SAVE_PROJECT',
        projectData
    }
}

export const createNewFidProject = project => {
    return (dispatch, getState) => {
        const db = getState().firebase.db
        const user = getState().users.user

        db.collection('fid')
            .doc(user.uid)
            .collection('projects')
            .doc(project.name)
            .set(project)
            .then(docRef => {
                console.log('Wrote project to firebase. Ref:', docRef.id)
                // Show indicator, project created
            })
    }
}

export const loadProjectIndices = () => {
    return (dispatch, getState) => {
        const db = getState().firebase.db
        const user = getState().users.user

        const fidProjects = db.collection('fid')
            .doc(user.uid)
            .collection('projects')

        const projectIndicesLoaded = projectIndices => {
            return {
                type: 'PROJECT_INDICES_LOADED',
                projectIndices
            }
        }

        const sketchMetadataLoaded = sketchMetadata => {
            return {
                type: 'SKETCH_METADATA_LOADED',
                sketchMetadata
            }
        }

        const loadSketchListForProjects = idList => {

            _.each(idList, i => {
                fidProjects
                    .doc(i.id)
                    .collection('sketches')
                    .get()
                    .then(querySnapshot => {
                        const sketchMetadataList = _.map(querySnapshot.docs, d => {
                            return {
                                projectId: i.id,
                                sketchMetadata: {
                                    id: d.id,
                                    name: d.id
                                }
                            }
                        })
                        dispatch(sketchMetadataLoaded(sketchMetadataList))
                    })
            })
        }

        fidProjects
            .get()
            .then(querySnapshot => {
                const documentIdList = _.map(querySnapshot.docs, (d) => {
                    return { 
                        id: d.id,
                        name: d.id
                    }
                })
                dispatch(projectIndicesLoaded(documentIdList))
                loadSketchListForProjects(documentIdList)
            })
    }
}

export const submitReleaseRateCalculation = calculationValues => {
    return (dispatch, getState) => {
        const db = getState().firebase.db

        db.collection('releaseRate')
            .add(calculationValues)
            .then(docRef => {

                console.log('CREATED', docRef.id)

                // Attach a listener to this document. When the calculation is done, the pdf will be uploaded there
                const unsubscribe = db
                    .collection('releaseRate')
                    .doc(docRef.id)
                    .collection('report')
                    .doc('pdf')
                    .onSnapshot(doc => {
                        if (doc.exists) {
                            // dispatch(downloadStorageObject(doc.data().reportPath))
                            dispatch({
                                type: 'RR_REPORT_LINK_RECEIVED',
                                url: doc.data().reportPath
                            })
                            unsubscribe()
                        }
                    })

                dispatch({
                    type: 'RELEASE_RATE_CALCULATION_RESULT_RECEIVED',
                    id: docRef.id
                })

                return docRef
            }).then(docRef => {
                console.log(`Listener created for document ${docRef.id}. Now sending request to releaseRateRequests collection`)
                const userId = getState().users.user.uid
                const timeStamp = new Date().getTime()
                db.collection('releaseRateRequests')
                    .add({
                        id: docRef.id,
                        timeStamp, userId
                    })
            }).catch(error => {
                console.error("Error adding document: ", error)
            })
    }
}
