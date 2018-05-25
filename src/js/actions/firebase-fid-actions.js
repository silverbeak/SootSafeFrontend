import * as _ from '../../../node_modules/lodash/lodash.min'
import { extendFieldsByName } from '../reducers/component-field-index'

export const saveProjectToDb = projectData => {
    return {
        type: 'SAVE_PROJECT',
        projectData
    }
}

export const createNewFidProject = project => {
    return (dispatch, getState) => {
        getDocRef(getState, project.name).then(projRef => {
            projRef.set(project).then(docRef => {
                console.log('Wrote project to firebase. Ref:', docRef)
            })
                .catch(reason => {
                    console.log('Could not create project in database', reason);
                })
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

export const loadFromBackend = (projectId, sketchId) => {
    return (dispatch, getState) => {
        getDocRef(getState, projectId, sketchId).then(sketchRef => {
            if (!sketchRef) {
                console.log('Could not locate document', getState().users, projectId, sketchId)
                return
            }

            const sketchPromise = sketchRef.get()
            const linkPromise = sketchRef.collection('linkDataArray').get()
            const nodePromise = sketchRef.collection('nodeDataArray').get()

            Promise
                .all([sketchPromise, linkPromise, nodePromise])
                .then(([sketchData, linkData, nodeData]) => {
                    const sketch = sketchData.data()
                    sketch.linkDataArray = linkData.docs.map(d => d.data())
                    const nodeDataArray = _.map(nodeData.docs, node => {
                        return _.assign({}, node.data(), { fields: extendFieldsByName(node.data().fields) })
                    })
                    sketch.nodeDataArray = nodeDataArray

                    dispatch({
                        type: 'SKETCH_DATA_LOADED',
                        sketchData: { model: sketch },
                        sketchId,
                        projectId
                    })
                })
        }).catch(reason => {
            console.log('Could not locate document', getState().users, projectId, sketchId, reason)
        })
    }
}

const getUserDbPromise = (getState, retries = 3, count = 0, timeout = 500) => {
    return new Promise((resolve, reject) => {
        const user = getState().users.user
        if (user) {
            resolve(getState().users.user)
        }
        else if (!user && retries > count) {

            setTimeout(() => {
                getUserDbPromise(getState, retries, count + 1, timeout + 100)
                    .then(result => resolve(result))
                    .catch(reason => reject(reason))
            }, timeout)
        }
        else {
            reject('Could not resolve user or user database')
        }
    })
}

const getDocRef = (getState, projectId, sketchId) => {
    return new Promise((resolve, reject) => {
        getUserDbPromise(getState).then((user) => {
            const db = getState().firebase.db
            // const user = getState().users.user

            if (!user) {
                resolve()
                return
            }

            let ref = db.collection('fid').doc(user.uid)

            if (!projectId) {
                resolve(ref)
                return
            }

            ref = ref.collection('projects').doc(projectId)

            if (!sketchId) {
                resolve(ref)
                return
            }

            resolve(ref.collection('sketches').doc(sketchId))
        }).catch(reason => {
            console.log("Reject reason:", reason);
            reject(reason)
        })
    })
}

export const saveToBackend = (payload, projectId, sketchId) => {
    return (dispatch, getState) => {

        getDocRef(getState, projectId, sketchId).then(sketchRef => {

            _.forEach(payload.linkDataArray, link => {
                sketchRef.collection('linkDataArray').doc(`${link.key}`).set(link)
            })

            // The two lines below are basically to "flatten" the type from a function to a string. 
            // Look into this later
            const payloadCopy = _.merge({}, payload.nodeDataArray)
            _.map(payloadCopy, convertNode)

            _.forEach(payloadCopy, node => {
                sketchRef.collection('nodeDataArray').doc(`${node.key}`).set(node)
            })
        }).catch((reason) => {
            console.log('Could not locate document', getState().users, projectId, sketchId, reason)
        })
    }
}

export const createNewSketch = (sketchName, projectId) => {
    return (dispatch, getState) => {
        getDocRef(getState, projectId).then(projRef => {

            if (!projRef) {
                console.log('Could not locate document', getState().users, projectId, sketchName)
                return
            }

            projRef
                .collection('sketches')
                .doc(sketchName)
                .set(_.assign({}, { ...model.model }, { name: sketchName }))
        }).catch(reason => {
            console.log('Could not create new sketch. Reason', reason)
        })
    }
}

export const calculatePressureLoss = (payload, projectId, sketchId) => {
    // The two lines below are basically to "flatten" the type from a function to a string. 
    // Look into this later
    const payloadCopy = _.merge({}, payload)
    _.map(payloadCopy.nodeDataArray, convertNode)

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
    "model": {
        "class": "go.GraphLinksModel",
        "copiesArrays": true,
        "copiesArrayObjects": true,
        "linkKeyProperty": "key",
        "linkFromPortIdProperty": "fid",
        "linkToPortIdProperty": "tid",
    }
}

const convertSingleField = (field, name) => {
    switch (field.type) {
        case Object:
            return {
                type: field.type.name,
                children: convertFields(field.children), name
            }
        default:
            return { [name]: Object.assign({}, field, { type: field.type.name }) }
    }
}

function convertFields(fields) {
    return _.map(fields, convertSingleField)
}

function convertNode(node) {
    if (node.fields) node.fields = convertFields(node.fields)
}