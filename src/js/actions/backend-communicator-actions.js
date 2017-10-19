import ReduxThunk from 'redux-thunk'

export const saveToBackend = payload => {
    
    const sendingDataToBackend = (data) => {
        return {
            type: 'SENDING_DATA_TO_BACKEND',
            data
        }
    }
    
    const dataSaveResponseReceived = data => {
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
        }).then(res => {
            res.json().then(data => {
                dispatch(dataSaveResponseReceived(data))
            })
        })
    }
    
}

export const loadFromBackend = (projectId, sketchId) => {

    const sketchLoaded = sketchData => {
        return {
            type: 'SKETCH_DATA_LOADED',
            sketchData,
            sketchId
        }
    }

    return dispatch => {
        fetch(`http://localhost:3001/project/${projectId}/sketch/${sketchId}`).then(
            opt => {
                opt.json().then(jsonData => {
                    dispatch(sketchLoaded(jsonData))
                })
            }
        ).then(
            data => console.log('Data', data)
        )
    }
}

export const loadProjectIndices = () => {

    const projectIndicesLoaded = projectIndices => {
        return {
            type: 'PROJECT_INDICES_LOADED',
            projectIndices
        }
    }

    return dispatch => {
        fetch('http://localhost:3001/project').then( opt => {
            opt.json().then(jsonData => {
                dispatch(projectIndicesLoaded(jsonData))
            })
        })
    }
}
