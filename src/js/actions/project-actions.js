import * as actions from './action-types'

export const partDropped = function(nodeData, sketchId) {
    return {
        type: actions.PART_DROPPED,
        sketchId,
        nodeData
    }
}

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

export const modelUpdated = (incrementalUpdateJson, sketchId) => {
    return {
        type: actions.MODEL_UPDATED,
        incrementalUpdateJson, sketchId
    }
}
