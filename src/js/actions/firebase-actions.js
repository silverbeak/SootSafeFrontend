export const saveProjectToDb = projectData => {
    return {
        type: 'SAVE_PROJECT',
        projectData
    }
}

export const submitReleaseRateCalculation = calculationValues => {
    return (dispatch, getState) => {
        const db = getState().firebase.db
        
        db.collection('releaseRate').add(calculationValues)
            .then(function(docRef) {

                console.log('CREATED', docRef.id)

                // Attach a listener to this document. When the calculation is done, the pdf will be uploaded there
                const unsubscribe = db
                    .collection('releaseRate')
                    .doc(docRef.id)
                    .collection('report')
                    .doc('pdf')
                    .onSnapshot(doc => {
                        if (doc.exists) {
                            console.log('YAY! RESULTS RECEIVED', doc.data())
                            unsubscribe()
                        }
                    })
                

                dispatch({
                    type: 'RELEASE_RATE_CALCULATION_RESULT_RECEIVED',
                    id: docRef.id
                })
            })
            .catch(function(error) {
                console.error("Error adding document: ", error)
            })
    }
}
