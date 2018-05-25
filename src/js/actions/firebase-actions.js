export const saveProjectToDb = projectData => {
    return {
        type: 'SAVE_PROJECT',
        projectData
    }
}

export const submitReleaseRateCalculation = calculationValues => {
    return (dispatch, getState) => {
        const db = getState().firebase.db

        db.collection('atex')
            .add(calculationValues)
            .then(docRef => {

                console.log('CREATED', docRef.id)

                // Attach a listener to this document. When the calculation is done, the pdf will be uploaded there
                const unsubscribe = db
                    .collection('atex')
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
                console.log(`Listener created for document ${docRef.id}. Now sending request to atexRequests collection`)
                const userId = getState().users.user.uid
                const timeStamp = new Date().getTime()
                db.collection('atexRequests')
                    .add({
                        id: docRef.id,
                        timeStamp, userId
                    })
            }).catch(error => {
                console.error("Error adding document: ", error)
            })
    }
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
                type: 'ELEMENTS_FETCHED',
                data: elements
            })        
        })
    }
}

// const saveData = (blob, fileName) => {
//     const a = document.createElement('a')
//     document.body.appendChild(a)
//     a.style = 'display: none'

//     const url = window.URL.createObjectURL(blob)
//     a.href = url
//     a.download = fileName
//     a.click()
//     window.URL.revokeObjectURL(url)
// }

// TODO: Probably remove. Don't think we want to do it this way
// export const downloadStorageObject = path => {
//     return (dispatch, getState) => {
//         const storage = getState().firebase.storage

//         const storageRef = storage.refFromURL(path)

//         storageRef.getDownloadURL().then(url => {
//             var xhr = new XMLHttpRequest()
//             xhr.responseType = 'blob'
//             xhr.onload = event => {
//                 const blob = xhr.response
//                 saveData(blob, 'ReleaseRate.pdf')
//                 dispatch({ type: 'XXX' })
//             }
//             xhr.open('GET', url)
//             xhr.send()
//         }).catch(function (error) {
//             // Handle any errors
//         })
//     }
// }
