export const partSelected = part => {
    return {
        type: 'PART_SELECTED',
        part
    }
}

export const partInfoUpdated = (key, value) => {
    return {
        type: 'PART_INFO_UPDATED',
        key, value
    }
}