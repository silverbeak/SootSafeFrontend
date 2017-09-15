export const partDropped = function(data, partKeys, sketchId) {
    return {
        type: 'PART_DROPPED',
        sketchId,
        partKeys,
        data
    }
}

export const partInfoUpdated = (partKey, infoKey, value) => {
    return {
        type: 'PART_INFO_UPDATED',
        partKey, infoKey, value
    }
}

export const modelUpdated = (incrementalUpdateJson, sketchId) => {
    return {
        type: 'MODEL_UPDATED',
        incrementalUpdateJson, sketchId
    }
}
