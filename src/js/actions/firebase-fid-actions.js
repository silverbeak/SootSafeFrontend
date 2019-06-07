import * as _ from '../../../node_modules/lodash/lodash.min'
import { extendFieldsByName } from '../reducers/component-field-index'
import * as actions from './action-types'
import { flattenNodeFields, flattenFields } from './marshaller/marshaller'
import { addUserToProjectData } from './firebase-actions'

export const createNewFidProject = project => (dispatch, getState) => {

    const db = getState().firebase.db
    const user = getState().users.user

    let projectCopy = _.merge({}, project)
    projectCopy.metadata = flattenFields(project.metadata)
    projectCopy = addUserToProjectData(projectCopy, user)

    // getDocRef(getState, _.kebabCase(project.metadata.name.value)).then(projRef => {

    db.collection('fid')
        .add(projectCopy)
        .then(docRef => {
            console.log('Wrote project to firebase. Ref:', docRef)
            dispatch(loadProjectIndices())
            // Show indicator, project created
        })
        .catch(reason => {
            console.log('Could not create project in database', reason);
        })
}

export const loadProjectIndices = () => (dispatch, getState) => {
    const db = getState().firebase.db
    const user = getState().users.user

    const projectIndicesLoaded = (projectIndices, actionType) => {
        return {
            type: actionType,
            projectIndices
        }
    }

    const sketchMetadataLoaded = sketchMetadata => {
        return {
            type: actions.SKETCH_METADATA_LOADED,
            sketchMetadata
        }
    }

    const loadSketchListForProjects = idList => {

        _.each(idList, i => {
            db
                .collection('fid')
                .doc(i.id)
                .collection('sketches')
                .get()
                .then(querySnapshot => {
                    const sketchMetadataList = _.map(querySnapshot.docs, d => {
                        return {
                            projectId: i.id,
                            sketchId: d.id,
                            sketchMetadata: d.data().metadata
                        }
                    })
                    dispatch(sketchMetadataLoaded(sketchMetadataList))
                })
        })
    }

    db.collection('fid')
        .where('metadata.users', 'array-contains', user.uid)
        .get()
        .then(querySnapshot => {
            const documentIdList = _.map(querySnapshot.docs, d => {
                return {
                    id: d.id,
                    name: d.data().metadata.name.value
                }
            })
            dispatch(projectIndicesLoaded(documentIdList, actions.PROJECT_INDICES_LOADED))
            loadSketchListForProjects(documentIdList)
        })

    db.collection('atex')
        .where('metadata.users', 'array-contains', user.uid)
        .get()
        .then(querySnapShot => {
            const projects = _.map(querySnapShot.docs, d => {
                return {
                    id: d.id,
                    name: d.data().metadata.name.value
                }
            })
            dispatch(projectIndicesLoaded(projects, actions.ATEX_PROJECT_INDICES_LOADED))
        })
}

export const loadFromBackend = (projectId, sketchId) => {
    return (dispatch, getState) => {
        const db = getState().firebase.db

        const sketchRef = db
            .collection('fid')
            .doc(projectId)
            .collection('sketches')
            .doc(sketchId)

        const sketchPromise = sketchRef.get()
        const linkPromise = sketchRef.collection('linkDataArray').get()
        const nodePromise = sketchRef.collection('nodeDataArray').get()

        Promise
            .all([sketchPromise, linkPromise, nodePromise])
            .then(([sketchData, linkData, nodeData]) => {
                const sketch = sketchData.data()
                sketch.linkDataArray = linkData.docs.map(d => d.data())
                const sketchSettingsArray = _.reduce(sketch.sketchData, (agg, f, name) => {
                    agg[name] = extendFieldsByName(f)
                    return agg
                }, {})
                const nodeDataArray = _.map(nodeData.docs, node => {
                    return _.assign({}, node.data(), { fields: extendFieldsByName(node.data().fields) })
                })
                sketch.nodeDataArray = nodeDataArray
                sketch.sketchData = sketchSettingsArray

                dispatch({
                    type: actions.SKETCH_DATA_LOADED,
                    sketchData: { model: sketch },
                    sketchId,
                    projectId
                })

            }).catch(reason => {
                console.log('Could not locate document', getState().users, projectId, sketchId, reason)
            })
    }
}

export const saveToBackend = (payload, projectId, sketchId) => {
    return (dispatch, getState) => {

        // getDocRef(getState, projectId, sketchId).then(sketchRef => {
        const db = getState().firebase.db
        const sketchRef = db
            .collection('fid')
            .doc(projectId)
            .collection('sketches')
            .doc(sketchId)

        _.forEach(payload.linkDataArray, link => {
            // sketchRef.collection('linkDataArray').doc(`${link.key}`).set(link) This is what I want. Find out why 'link.key' has become undefined
            sketchRef
                .collection('linkDataArray')
                .doc(`${link.__gohashid}`)
                .set(link)
        })

        // The two lines below are basically to "flatten" the type from a function to a string. 
        // Look into this later
        const payloadCopy = _.merge({}, payload.nodeDataArray)
        _.forEach(payloadCopy, flattenNodeFields)

        _.forEach(payloadCopy, node => {
            sketchRef.collection('nodeDataArray').doc(`${node.key}`).set(node)
        })
        const flattenedSketchData = payload.metadata
        sketchRef
            .update({ "metadata": flattenedSketchData })
            .then(() => console.log(`Saved ${projectId}/${sketchId} to backend`))
            .catch((reason) => {
                console.log('Could not locate document', getState().users, projectId, sketchId, reason)
            })

        dispatch(loadProjectIndices())
    }
}

export const createNewSketch = (sketchData, projectId) => {
    return (dispatch, getState) => {

        const sketchDataCopy = _.merge({}, sketchData)
        sketchDataCopy.metadata = flattenFields(sketchData.metadata)

        getState().firebase.db
            .collection('fid')
            .doc(projectId)
            .collection('sketches')
            .add(_.assign({}, { ...model.model }, sketchDataCopy))
            .then(() => {
                dispatch(loadProjectIndices())
            }).catch(reason => {
                console.log('Could not create new sketch. Reason', reason)
            })
    }
}

export const calculatePressureLoss = (payload, projectId, sketchId) => {
    // The two lines below are basically to "flatten" the type from a function to a string. 
    // Look into this later
    const payloadCopy = _.merge({}, payload)
    _.forEach(payloadCopy.nodeDataArray, flattenNodeFields)
    payloadCopy.sketchData = _.map(payloadCopy.sketchData, flattenFields)

    return (dispatch, getState) => {
        let user = getState().users.user
        if (!user) return
        user = user.toJSON()
        delete user.providerData
        delete user.stsTokenManager
        getState().firebase.db
            .collection('fidRequests')
            .add(_.assign({}, payloadCopy, { targetFirePressure: 1000, user, projectId, sketchId }))
            .then(result => {
                console.log('FID response', result);
            })
    }
}

const model = {
    model: {
        class: "go.GraphLinksModel",
        copiesArrays: true,
        copiesArrayObjects: true,
        linkKeyProperty: "key",
        linkFromPortIdProperty: "fid",
        linkToPortIdProperty: "tid",
    }
}
