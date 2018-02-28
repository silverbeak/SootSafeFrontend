import * as _ from '../../../../node_modules/lodash/lodash.min'

const gasList = [
    { name: 'Hydrogen', CASnr: '1333-74-0', EGnr: '215-605-7', RDT: 0.07, flamePoint: 'gas', explosionLimit: { volume: { LFL: 4.0, UFL: 77.0 }, weight: { LFL: 3.4, UFL: 63 } }, autoIgnitionTemperature: 538, temperatureClass: 'T1', MESG: 0.29, explosionClass: 'IIC', gasDensity: 0.0899, molarMass: 2.014 / 1000 },
    { name: 'Acetylene (ethyne)', CASnr: '74-86-2', EGnr: '200-816-9', RDT: 0.90, flamePoint: 'gas', explosionLimit: { volume: { LFL: 2.3, UFL: 100 }, weight: { LFL: 24, UFL: 1092 } }, autoIgnitionTemperature: 305, temperatureClass: 'T2', MESG: 0.37, explosionClass: 'IIC', gasDensity: 1.092, molarMass: 26.04 / 1000 },
    { name: 'Ethanol', CASnr: '64-17-5', EGnr: '200-578-6', RDT: 1.59, flamePoint: '12', explosionLimit: { volume: { LFL: 3.1, UFL: 19.0 }, weight: { LFL: 59, UFL: 532 } }, autoIgnitionTemperature: 400, temperatureClass: 'T2', MESG: 0.89, explosionClass: 'IIB', gasDensity: 0, molarMass: 46.07 / 1000 }
]

const initialReleaseRateState = {
    fields: {
        name: '',
        liquidOrGas: 'liquid',
        calculateReleaseRate: 'yes',
        poolLeakage: 'yes',
        releaseRateInKgPerSecond: 'yes',

        volumetricGasFlowRate: 0,
        safetyFactor: 0.25,
        lowerFlammableLimit: gasList[0].explosionLimit.volume.LFL,
        massReleaseRate: 0,
        molarMass: gasList[0].gasDensity,
        gasDensity: gasList[0].molarMass,
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
        compressibilityFactor: 0,

        indoorOutdoor: 'indoors',
        obstructedOrUnobstructed: 'unobstructed',
        elevation: 1,
        ventilationVelocity: 0,
        ventilationAvailability: 'good',

        element: gasList[0].CASnr,

        backgroundConcentration: 0,
        airEnteringRoomFlowRate: 0,
        airChangeFrequency: 0,
        roomVolume: 0,
        openingCrossSection: 0,
        mixingSafetyFactor: 1,

        releaseGrade: 'primary'
    },
    gasList
}

const releaseRate = (state = initialReleaseRateState, action) => {
    switch (action.type) {
        case 'RR_FIELD_VALUE_UPDATED':
            // console.log('Field value updated', action)
            const stateCopy = _.merge({}, state)
            stateCopy.fields[action.fieldName] = action.value
            return stateCopy

        case 'RR_ELEMENT_VALUE_UPDATED':
            const elementStateCopy = _.merge({}, state)
            const element = _.find(gasList, g => g.CASnr === action.value)
            elementStateCopy.fields.element = action.value
            elementStateCopy.fields.lowerFlammableLimit = element.explosionLimit.volume.LFL
            elementStateCopy.fields.gasDensity = element.gasDensity
            elementStateCopy.fields.molarMass = element.molarMass
            
            return elementStateCopy

        default:
            return state
    }
}

export default releaseRate