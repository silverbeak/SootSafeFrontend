import ReduxThunk from 'redux-thunk'
import * as _ from '../../../node_modules/lodash/lodash.min'

const convertSingleField = (field, name) => {
    switch(field.type) {
        case Number:
        return {
            numberValue: field.value,
            name,
        }
        case Boolean:
        return {
            boolValue: field.value,
            name
        }
        case String:
        return {
            stringValue: field.value,
            name
        }
        case Object:
        return { children: convertFields(field.children), name }
    }
}

function convertFields(fields) {
    return _.map(fields, convertSingleField)
}

function convertNode(node) {
    if (node.fields) node.fields = convertFields(node.fields)
}

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
    
    const createHttpPayload = payload => {
        const payloadCopy = _.merge({}, payload)
        _.map(payloadCopy.nodeDataArray, convertNode)
        return JSON.stringify(payloadCopy)
        
    }
    
    return dispatch => {
        dispatch(sendingDataToBackend(payload))
        
        const jsonString = createHttpPayload(payload)
        
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
