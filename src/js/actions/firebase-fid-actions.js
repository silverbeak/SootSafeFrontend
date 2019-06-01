import * as _ from '../../../node_modules/lodash/lodash.min'
import { extendFieldsByName } from '../reducers/component-field-index'
import * as actions from './action-types'

export const saveProjectToDb = projectData => {
    return {
        type: actions.SAVE_PROJECT,
        projectData
    }
}

export const createNewFidProject = project => {
    return (dispatch, getState) => {
        getDocRef(getState, project.name).then(projRef => {
            projRef
                .set(project)
                .then(docRef => {
                    console.log('Wrote project to firebase. Ref:', docRef)
                    dispatch(loadProjectIndices())
                    // Show indicator, project created
                })
                .catch(reason => {
                    console.log('Could not create project in database', reason);
                })
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
                type: actions.PROJECT_INDICES_LOADED,
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
                // sketchRef.collection('linkDataArray').doc(`${link.key}`).set(link) This is what I want. Find out why 'link.key' has become undefined
                sketchRef.collection('linkDataArray').doc(`${link.__gohashid}`).set(link)
            })

            // The two lines below are basically to "flatten" the type from a function to a string. 
            // Look into this later
            const payloadCopy = _.merge({}, payload.nodeDataArray)
            _.forEach(payloadCopy, flattenNodeFields)

            _.forEach(payloadCopy, node => {
                sketchRef.collection('nodeDataArray').doc(`${node.key}`).set(node)
            })
            
            const flattenedSketchData = _.map(payload.sketchData, flattenFields)[0]
            sketchRef.update({ "sketchData.fields": flattenedSketchData })
        }).catch((reason) => {
            console.log('Could not locate document', getState().users, projectId, sketchId, reason)
        })
    }
}

export const createNewSketch = (sketchData, projectId) => {
    return (dispatch, getState) => {
        getDocRef(getState, projectId)
            .then(projRef => {
                if (!projRef) {
                    console.log('Could not locate document', getState().users, projectId, sketchData.name)
                    return
                }
                projRef
                    .collection('sketches')
                    .doc(sketchData.name)
                    .set(_.assign({}, { ...model.model }, sketchData))
                    .then(result => {
                        dispatch(loadProjectIndices())
                        console.log('Sketch created', result);
                        
                    })
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
        sketchData: {
            fields: {
                targetFirePressure: {
                    min: 100,
                    name: "Target Fire Pressure",
                    type: "Number",
                    unit: "Pa",
                    value: 1500,
                    path: "fields.targetFirePressure"
                }
            }
        }
    }
}

const flattenSingleField = (agg, field, name) => {
    switch (field.type) {
        case Object:
            agg[name] = {
                type: field.type.name,
                children: flattenFields(field.children),
                name
            }
            break
        default:
            agg[name] = _.assign({}, field, { type: field.type.name, value: new String(field.value).toString() })
    }
    return agg
}

function flattenFields(fields) {
    return _.reduce(fields, flattenSingleField, {})
}

function flattenNodeFields(node) {
    if (node.fields) {
        const flattenedFields = flattenFields(node.fields)
        node.fields = flattenedFields
    }
}