import * as _ from '../../../../node_modules/lodash/lodash.min'

const initialReleaseRateState = {
    fields: {
        name: '',
        liquidOrGas: 'liquid',
        calculateReleaseRate: 'yes',
        poolLeakage: 'yes',
        releaseRateInKgPerSecond: 'yes',

        volumetricGasFlowRate: 0,
        safetyFactor: 0.25,
        lowerFlammableLimit: 0,
        massReleaseRate: 0,
        molarMass: 0,
        gasDensity: 0,
        dischargeCoefficient: 0,
        crossSectionArea: 0,
        pressureDifference: 0,
        poolSurfaceArea: 0,
        windSpeed: 0,
        absoluteTemperature: 0,
        adiabaticExpansion: 0,
        atmosphericPressure: 101325,
        containerPressure: 0,
        criticalGasPressure: 0,
        compressibilityFactor: 0
    }
}

const releaseRate = (state = initialReleaseRateState, action) => {
    switch (action.type) {
        case 'RR_FIELD_VALUE_UPDATED':
            // console.log('Field value updated', action)
            const stateCopy = _.merge({}, state)
            stateCopy.fields[action.fieldName] = action.value
            return stateCopy

        default:
            return state
    }
}

export default releaseRate