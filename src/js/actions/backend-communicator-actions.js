import ReduxThunk from 'redux-thunk'

export const saveToBackend = payload => {
    
    const sendingDataToBackend = (data) => {
        return {
            type: 'SENDING_DATA_TO_BACKEND',
            data
        }
    }
    
    const dataSaveResponseReceived = data => {
        console.log('Yay! Success!', data)
        return {
            type: 'DATA_SAVE_RESPONSE_RECEIVED',
            data
        }
    }
    
    const dataSaveErrorReceived = (code, msg, trailer) => {
        return {
            type: 'DATA_SAVE_ERROR_RECEIVED',
            code, msg, trailer
        }
    }
    
    
    return dispatch => {
        dispatch(sendingDataToBackend(payload))
        
        const jsonString = JSON.stringify(payload)
        var data = new FormData();
        data.append( "json", jsonString)
        
        fetch("http://localhost:3001/test-page", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: jsonString
        })
        .then( res => {
            res.json().then( data => {
                dispatch(dataSaveResponseReceived(data))
            })
        })
        .then( data => {
            console.log('Got an error response', data)
            dispatch(dataSaveErrorReceived(data))
        })
    }
    
}

export const loadFromBackend = sketchId => {

    const sketchLoaded = sketchData => {
        return {
            type: 'SKETCH_DATA_LOADED',
            sketchData,
            sketchId
        }
    }

    return dispatch => {
        fetch('http://localhost:3001/').then(
            opt => {
                opt.json().then(jsonData => {
                    // console.log('OPT', opt.json())
                    dispatch(sketchLoaded(jsonData))
                })
            }
        ).then(
            data => console.log('Data', data)
        )
    }
}
