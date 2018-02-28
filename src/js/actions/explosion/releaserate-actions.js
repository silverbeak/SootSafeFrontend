import * as firebaseActions from '../firebase-actions'
import * as _ from '../../../../node_modules/lodash/lodash.min'


export const fieldValueUpdated = (fieldName, value) => {
    return {
        type: 'RR_FIELD_VALUE_UPDATED',
        fieldName, value
    }
}

export const elementUpdated = value => {
    return {
        type: 'RR_ELEMENT_VALUE_UPDATED',
        value
    }
}

export const submitReleaseRateCalculationRequest = fieldValues => {
    return (dispatch, getState) => {
        const performReleaseCalculation = fieldValues.calculateReleaseRate === 'yes'
        const isGasCalculation = fieldValues.liquidOrGas === 'gas'
        const hasReleaseRateInKgPerSecond = fieldValues.releaseRateInKgPerSecond === 'yes'
        const isEvaporationFromPool = fieldValues.poolLeakage === 'yes'
        const isIndoor = fieldValues.indoorOutdoor === 'indoors'
        const isObstructed = fieldValues.obstructedOrUnobstructed === 'obstructed'

        const booleanCollection = {
            performReleaseCalculation,
            isGasCalculation,
            hasReleaseRateInKgPerSecond,
            isEvaporationFromPool,
            isIndoor,
            isObstructed
        }

        const properData = _.merge({}, fieldValues, booleanCollection)

        dispatch(firebaseActions.submitReleaseRateCalculation(properData))
    }
}