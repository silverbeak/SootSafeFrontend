import { extendFieldsByName } from '../reducers/component-field-index'
import * as _ from '../../../node_modules/lodash/lodash.min'
import { showNotification } from './notification-actions'
import * as actions from './action-types'

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

const sendToBackend = (payload, path, onResult) => {

    const sendingDataToBackend = (data) => {
        return {
            type: actions.SENDING_DATA_TO_BACKEND,
            data
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

        fetch(path, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: jsonString
        }).then(res => onResult(res, dispatch))
    }

}

export const createNewProject = projectName => {
    return dispatch => {
        const json = { projectName }
    
        const handleResponse = response => {
            if (response.status === 200 || response.status === 201) {
                dispatch(loadProjectIndices())
                dispatch({
                    type: actions.NEW_PROJECT_CREATED,
                    project: { projectName }
                })
            } else {
                dispatch({
                    type: actions.PROJECT_CREATE_ERROR
                    // TODO: Some error message
                })
            }
        }
    
        fetch('http://localhost:3001/project', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(json)
        }).then(res => {
            handleResponse(res)
        })
    
        return { type: actions.CREATE_NEW_PROJECT_REQUEST_SENT_TO_SERVER }
    }

}

export const createNewSketch = (sketchName, projectId) => {
    return dispatch => {
        const json = { sketchName, projectId }
    
        const handleResponse = res => {
            if (res.status === 200 || res.status === 201) {
                dispatch(loadProjectIndices())
                dispatch({
                    type: actions.NEW_SKETCH_CREATED,
                    projectId, sketchName
                })
            } else {
                dispatch({
                    type: actions.SKETCH_CREATE_ERROR
                    // TODO: Some error message
                })
            }
        }

        fetch(`http://localhost:3001/project/${projectId}/sketch`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(json)
        }).then(res => {
            handleResponse(res)
        })
    
        return { type: actions.CREATE_NEW_SKETCH_REQUEST_SENT_TO_SERVER }
    }
}

export const saveToBackend = (payload, projectId, sketchId) => {
    const dataSaveResponseReceived = data => {
        return {
            type: actions.DATA_SAVE_RESPONSE_RECEIVED,
            data
        }
    }

    // const dataSaveErrorReceived = (code, msg, trailer) => {
    //     return {
    //         type: 'DATA_SAVE_ERROR_RECEIVED',
    //         code, msg, trailer
    //     }
    // }

    const onResult = (res, dispatch) => {
        res.json().then(data => {
            // console.log('Save result:', data)
            dispatch(dataSaveResponseReceived(data))
            // dispatch(showNotification('Successfully saved'))
        })
    }

    return sendToBackend(payload, `http://localhost:3001/project/${projectId}/sketch/${sketchId}`, onResult)
}

export const calculatePressureLoss = (payload, projectId, sketchId) => {

    const handleCalculationResult = (dispatch, data) => {
        dispatch({ type: actions.PRESSURE_RESULT_RECEIVED, projectId, sketchId })
        if (data.errorMessage) {
            dispatch(showNotification('Calculation could not be performed'))
            dispatch({
                type: actions.SHOW_GENERIC_ERROR_MESSAGE,
                title: 'Calculation unsuccessful',
                message: data.errorMessage
            })
        } else {
            dispatch(showNotification('Calculation performed successfully'))
            _.forEach(data.entries, entry => {
                dispatch({
                    type: actions.PRESSURE_CALCULATION_ENTRY_RESULT,
                    entry, projectId, sketchId
                })
            })
        }
    }

    const onResult = (res, dispatch) => {
        res.json().then(data => {
            console.log('Calculation result:', data)
            handleCalculationResult(dispatch, data)
        })
    }
    payload.targetFirePressure = 1000
    return sendToBackend(payload, `http://localhost:3001/project/${projectId}/sketch/${sketchId}/calculate`, onResult)
}

// const convertIncomingFields = node => {
//     return Object.assign({}, node, _.map(node, extendFieldsByName))
// }

export const loadFromBackend = (projectId, sketchId) => {

    const sketchLoaded = sketchData => {
        return {
            type: actions.SKETCH_DATA_LOADED,
            sketchData,
            sketchId
        }
    }

    return dispatch => {
        fetch(`http://localhost:3001/project/${projectId}/sketch/${sketchId}`).then(
            opt => {
                opt.json().then(jsonData => {

                    _.forEach(jsonData.nodeDataArray, node => node.fields = extendFieldsByName(node.fields))

                    const model = {
                        "model": {
                            "class": "go.GraphLinksModel",
                            "copiesArrays": true,
                            "copiesArrayObjects": true,
                            "linkKeyProperty": "key",
                            "linkFromPortIdProperty": "fid",
                            "linkToPortIdProperty": "tid",
                            "nodeDataArray": jsonData.nodeDataArray,
                            "linkDataArray": jsonData.linkDataArray
                        }
                    }
                    dispatch(sketchLoaded(model))
                    dispatch(showNotification('Project loaded'))
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
            type: actions.PROJECT_INDICES_LOADED,
            projectIndices
        }
    }

    return dispatch => {
        fetch('http://localhost:3001/project').then(opt => {
            opt.json().then(jsonData => {
                dispatch(projectIndicesLoaded(jsonData))
            })
        })
    }
}
