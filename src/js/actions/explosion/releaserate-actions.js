import * as firebaseActions from '../firebase-actions'
import * as _ from '../../../../node_modules/lodash/lodash.min'


export const fieldValueUpdated = (fieldName, value) => {
    return {
        type: 'RR_FIELD_VALUE_UPDATED',
        fieldName, value
    }
}


export const submitReleaseRateCalculationRequest = fieldValues => {
    return (dispatch, getState) => {
        const performReleaseCalculation = fieldValues.calculateReleaseRate === 'yes'
        const isGasCalculation = fieldValues.liquidOrGas === 'gas'
        const hasReleaseRateInKgPerSecond = fieldValues.releaseRateInKgPerSecond === 'yes'
        const isEvaporationFromPool = fieldValues.poolLeakage === 'yes'

        const properData = _.merge({}, fieldValues, {performReleaseCalculation, isGasCalculation, hasReleaseRateInKgPerSecond, isEvaporationFromPool})

        dispatch(firebaseActions.submitReleaseRateCalculation(properData))
    }
}