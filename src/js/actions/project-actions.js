export const sketchUpdated = function(data, sketchId) {
    return {
        type: 'SKETCH_UPDATED',
        sketchId,
        data
    }
}