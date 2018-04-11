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

export const resetReportLink = () => {
    return {
        type: 'RR_RESET_REPORT_LINK'
    }
}

export const submitReleaseRateCalculationRequest = fieldValues => {
    return (dispatch, getState) => {
        const performReleaseCalculation = fieldValues.calculateReleaseRate === 'yes'
        const isGasCalculation = fieldValues.liquidOrGas === 'gas'
        const hasReleaseRateInKgPerSecond = fieldValues.releaseRateInKgPerSecond === 'yes'
        const isEvaporationFromPool = fieldValues.poolLeakage === 'yes'
        const isIndoors = fieldValues.indoorOutdoor === 'indoors'

        const booleanCollection = {
            performReleaseCalculation,
            isGasCalculation,
            hasReleaseRateInKgPerSecond,
            isEvaporationFromPool,
            isIndoors
        }

        // Not sure if we still need this. May have solved it in backend.
        const filteredValues = _.omit(fieldValues, [
            'releaseRateInKgPerSecond',
            'indoorOutdoor',
            'calculateReleaseRate',
            'liquidOrGas',
            'poolLeakage',
            'backgroundConcentration'
        ])

        const properData = _.merge({}, filteredValues, booleanCollection)

        dispatch(firebaseActions.submitReleaseRateCalculation(properData))
    }
}