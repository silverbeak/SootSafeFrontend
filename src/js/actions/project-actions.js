export const sketchUpdated = function(data, sketchId) {
    return {
        type: 'SKETCH_UPDATED',
        sketchId,
        data
    }
}

export const partInfoUpdated = (partKey, infoKey, value) => {
    return {
        type: 'PART_INFO_UPDATED',
        partKey, infoKey, value
    }
}