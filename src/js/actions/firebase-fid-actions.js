import * as _ from '../../../node_modules/lodash/lodash.min'

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
                    sketch.nodeDataArray = nodeData.docs.map(d => d.data())

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
            sketchRef.set(payload.baseData)

            _.forEach(payload.projectData.linkDataArray, link => {
                sketchRef.collection('linkDataArray').doc(`${link.key}`).set(link)
            })

            _.forEach(payload.projectData.nodeDataArray, node => {
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

export const calculatePressureLoss = () => { }

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