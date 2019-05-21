import * as actions from './action-types'
import { mergeSingle } from '../reducers/component-field-index';

export const partInfoUpdated = (partKey, infoKey, value, sketchId) => {
    return {
        type: actions.PART_INFO_UPDATED,
        partKey, infoKey, value, sketchId
    }
}

export const partTypeChanged = (partKey, infoKey, value, sketchId) => {
    return {
        type: actions.PART_TYPE_CHANGED,
        partKey, infoKey, value, sketchId
    }
}

export const modelUpdated = (incrementalUpdateJson, sketchId, droppedNodeData) => dispatch => {
    const node = !!droppedNodeData ? mergeSingle(droppedNodeData) : false

    if (!!droppedNodeData) {
        dispatch({
            type: actions.PART_DROPPED,
            sketchId,
            node
        })
    }

    dispatch({
        type: actions.MODEL_UPDATED,
        incrementalUpdateJson,
        sketchId,
        droppedNodeData: node
    })
}

export const sketchDataUpdated = (projectId, sketchId, fieldPath, value) => dispatch => {
    dispatch({
        type: actions.SKETCH_DATA_UPDATED,
        projectId, sketchId, fieldPath, value
    })
}