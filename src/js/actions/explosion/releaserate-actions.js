export const fieldValueUpdated = (fieldName, value) => {
    return {
        type: 'RR_FIELD_VALUE_UPDATED',
        fieldName, value
    }
}