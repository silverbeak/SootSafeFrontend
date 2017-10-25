export const partDropped = function(data, partKeys, sketchId) {
    return {
        type: 'PART_DROPPED',
        sketchId,
        partKeys,
        data
    }
}

export const partInfoUpdated = (partKey, infoKey, value, sketchId) => {
    return {
        type: 'PART_INFO_UPDATED',
        partKey, infoKey, value, sketchId
    }
}

export const partTypeChanged = (partKey, infoKey, value, sketchId) => {
    return {
        type: 'PART_TYPE_CHANGED',
        partKey, infoKey, value, sketchId
    }
}

export const modelUpdated = (incrementalUpdateJson, sketchId) => {
    return {
        type: 'MODEL_UPDATED',
        incrementalUpdateJson, sketchId
    }
}
