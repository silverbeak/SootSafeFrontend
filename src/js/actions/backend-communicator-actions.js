import ReduxThunk from 'redux-thunk'
import { extendFieldsByName } from '../reducers/component-field-index'
import * as _ from '../../../node_modules/lodash/lodash.min'

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
            type: 'SENDING_DATA_TO_BACKEND',
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

export const saveToBackend = (payload, projectId, sketchId) => {
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

    const onResult = (res, dispatch) => {
        res.json().then(data => {
            // console.log('Save result:', data)
            dispatch(dataSaveResponseReceived(data))
        })
    }

    return sendToBackend(payload, `http://localhost:3001/project/${projectId}/sketch/${sketchId}`, onResult)
}

export const calculatePressureLoss = (payload, projectId, sketchId) => {

    const handleCalculationResult = (dispatch, data) => {
        dispatch({ type: 'PRESSURE_RESULT_RECEIVED', projectId, sketchId })
        if (data.errorMessage) {
            dispatch({
                type: 'PRESSURE_CALCULATION_ERROR_RECEIVED',
                message: data.errorMessage
            })
        } else {
            _.forEach(data.entries, entry => {
                dispatch({
                    type: 'PRESSURE_CALCULATION_ENTRY_RESULT',
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
    return sendToBackend(payload, `http://localhost:3001/project/${projectId}/sketch/${sketchId}/calculate`, onResult)
}

const convertIncomingFields = node => {
    return Object.assign({}, node, _.map(node, extendFieldsByName))
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
        fetch('http://localhost:3001/project').then(opt => {
            opt.json().then(jsonData => {
                dispatch(projectIndicesLoaded(jsonData))
            })
        })
    }
}
