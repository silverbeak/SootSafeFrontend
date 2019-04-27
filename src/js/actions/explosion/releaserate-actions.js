import * as firebaseActions from '../firebase-actions'
import * as _ from '../../../../node_modules/lodash/lodash.min'
import * as actions from '../action-types'


export const fieldValueUpdated = (fieldName, value) => {
    return {
        type: actions.ATEX_FIELD_VALUE_UPDATED,
        fieldName, value
    }
}

export const elementUpdated = value => {
    return {
        type: actions.ATEX_ELEMENT_VALUE_UPDATED,
        value
    }
}

export const resetReportLink = () => {
    return {
        type: actions.ATEX_REPORT_LINK
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

        const properData = _.merge({}, fieldValues, booleanCollection)

        dispatch(firebaseActions.submitReleaseRateCalculation(properData))
    }
}