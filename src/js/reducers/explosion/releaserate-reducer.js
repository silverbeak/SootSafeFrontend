import * as _ from '../../../../node_modules/lodash/lodash.min'

const gasList = [
    { name: 'Acetylene (ethyne)', CASnr: '74-86-2', EGnr: '200-816-9', RDT: 0.90, flamePoint: 'gas', explosionLimit: { volume: { LFL: .023, UFL: 1.00 }, weight: { LFL: 24, UFL: 1092 } }, autoIgnitionTemperature: 305, temperatureClass: 'T2', MESG: 0.37, explosionClass: 'IIC', gasDensity: 1.092, molarMass: 26.04 / 1000 },
    { name: 'Benzene', CASnr: '71-43-2', EGnr: '200-753-7', RDT: 2.70, flamePoint: '-11', explosionLimit: { volume: { LFL: .012, UFL: .086 }, weight: { LFL: 39, UFL: 280 } }, autoIgnitionTemperature: 498, temperatureClass: 'T1', MESG: 0.99, explosionClass: 'IIA', gasDensity: 3.486, molarMass: 78.11 / 1000 },
    { name: 'Ethanol', CASnr: '64-17-5', EGnr: '200-578-6', RDT: 1.59, flamePoint: '12', explosionLimit: { volume: { LFL: .031, UFL: .19 }, weight: { LFL: 59, UFL: 532 } }, autoIgnitionTemperature: 400, temperatureClass: 'T2', MESG: 0.89, explosionClass: 'IIB', gasDensity: 0, molarMass: 46.07 / 1000 },
    { name: 'Hydrogen', CASnr: '1333-74-0', EGnr: '215-605-7', RDT: 0.07, flamePoint: 'gas', explosionLimit: { volume: { LFL: .040, UFL: .77 }, weight: { LFL: 3.4, UFL: 63 } }, autoIgnitionTemperature: 538, temperatureClass: 'T1', MESG: 0.29, explosionClass: 'IIC', gasDensity: 0.0899, molarMass: 2.014 / 1000 },
    { name: 'Propane', CASnr: '74-98-6', EGnr: '200-827-9', RDT: 1.56, flamePoint: 'gas', explosionLimit: { volume: { LFL: .017, UFL: .109 }, weight: { LFL: 31, UFL: 200 } }, autoIgnitionTemperature: 450, temperatureClass: 'T2', MESG: 0.92, explosionClass: 'IIA', gasDensity: 2.01, molarMass: 44.1 / 1000 },
    { name: 'Xylene', CASnr: '1330-20-7', EGnr: '215-535-7', RDT: 3.66, flamePoint: '30', explosionLimit: { volume: { LFL: .010, UFL: .076 }, weight: { LFL: 44, UFL: 335 } }, autoIgnitionTemperature: 464, temperatureClass: 'T1', MESG: 1.09, explosionClass: 'IIA', gasDensity: 0.486, molarMass: 106.16 / 1000 }
]

const initialReleaseRateState = {
    fields: {
        // name: '',
        liquidOrGas: 'liquid',
        calculateReleaseRate: 'yes',
        poolLeakage: 'yes',
        releaseRateInKgPerSecond: 'yes',

        releaseRateValues: {
            volumetricGasFlowRate: 0,
            safetyFactor: 0.25,
            lowerFlammableLimit: gasList[0].explosionLimit.volume.LFL,
            massReleaseRate: 0,
            evaporationRate: 0,
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
        },

        bgConcentrationValues: {
            ventilationEfficiencyFactor: 1, // f
            volumetricFlowAir: 0,           // Q_1
            volumetricFlowAirGas: 0,        // Q_2
            // airChangeFrequency: 0,       // C
            airEnteringRoomFlowRate: 0,     // Q or Q_A
            roomDimensions: {
                width: 0,                   // B
                height: 0,                  // H
                depth: 0                    // L (using 'depth' instead of length, as length is reserved)
            },
            crossSectionArea: 0             // S
        },

        ventilationVelocityValues: {
            elevation: 1,
            obstructed: 'Unobstructed'
        },

        indoorOutdoor: 'indoors',
        // ventilationVelocity: 0,
        ventilationAvailability: 'Good',

        casNumber: gasList[0].CASnr,

        // backgroundConcentration: 0,
        // mixingSafetyFactor: 1,
        releaseType: 'HeavyGas',

        gradeOfRelease: 'Primary'
    },
    gasList,
    report: {}
}

const setReportLink = (originalState, url) => {
    const stateCopy = _.merge({}, originalState)
    stateCopy.report.url = url
    return stateCopy
}

const releaseRate = (state = initialReleaseRateState, action) => {
    switch (action.type) {
        case 'RR_FIELD_VALUE_UPDATED':
            // console.log('Field value updated', action)
            const stateCopy = _.merge({}, state)
            _.set(stateCopy.fields, action.fieldName, action.value)
            return stateCopy

        case 'RR_ELEMENT_VALUE_UPDATED':
            const elementStateCopy = _.merge({}, state)
            const element = _.find(gasList, g => g.CASnr === action.value)
            elementStateCopy.fields.casNumber = action.value
            elementStateCopy.fields.releaseRateValues.lowerFlammableLimit = element.explosionLimit.volume.LFL
            elementStateCopy.fields.releaseRateValues.gasDensity = element.gasDensity
            elementStateCopy.fields.releaseRateValues.molarMass = element.molarMass
            
            return elementStateCopy

        case 'RR_RESET_REPORT_LINK':
            return setReportLink(state, null)

        case 'RR_REPORT_LINK_RECEIVED':
            return setReportLink(state, action.url)

        default:
            return state
    }
}

export default releaseRate