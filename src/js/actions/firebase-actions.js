export const saveProjectToDb = projectData => {
    return {
        type: 'SAVE_PROJECT',
        projectData
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

const saveData = (blob, fileName) => {
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.style = 'display: none'

    const url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
}

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
