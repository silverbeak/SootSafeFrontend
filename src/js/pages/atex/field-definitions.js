import React from 'react'

import * as _ from '../../../../node_modules/lodash/lodash.min'

import * as names from './field-names'

const greaterThanZero = (value) => {
    return value > 0 ? '' : 'Value must be greater than 0'
}

const adornmentClassNames = "MuiTypography-root-102 MuiTypography-body1-111 MuiTypography-colorTextSecondary"

export const fieldDefinitions = [
    [
        names.VOLUMETRIC_GAS_FLOW_RATE,
        () => <span>Q<sub>g</sub></span>,
        () => <span className={adornmentClassNames}>m<sup>3</sup>/s</span>,
        greaterThanZero,
        Number
    ],[
        names.SAFETY_FACTOR,
        () => 'k',
        () => <i className={adornmentClassNames}>no unit</i>,
        greaterThanZero,
        Number
    ],[
        names.LOWER_FLAMMABLE_LIMIT,
        () => 'LFL',
        () => 'vol/vol',
        greaterThanZero,
        Number
    ],[
        names.MASS_RELEASE_RATE,
        () => <span>W<sub>g</sub></span>,
        () => 'kg/s',
        greaterThanZero,
        Number
    ],[
        names.EVAPORATION_RATE,
        () => <span>W<sub>e</sub></span>,
        () => 'kg/s',
        greaterThanZero,
        Number
    ],[
        names.MOLAR_MASS,
        () => 'M',
        () => 'kg/mol',
        greaterThanZero,
        Number
    ],[
        names.GAS_DENSITY,
        () => <span>&rho;<sub>g</sub></span>,
        () => <span className={adornmentClassNames}>kg/m<sup>3</sup></span>,
        greaterThanZero,
        Number
    ],[
        names.DISCHARGE_COEFFICIENT,
        () => <span>C<sub>d</sub></span>,
        () => <i className={adornmentClassNames}>no unit</i>,
        greaterThanZero,
        Number
    ],[
        names.CROSS_SECTION_AREA,
        () => 'S',
        () => <span className={adornmentClassNames}>m<sup>2</sup></span>,
        greaterThanZero,
        Number
    ],[
        names.PRESSURE_DIFFERENCE,
        () => 'p',
        () => 'Pa',
        greaterThanZero,
        Number
    ],[
        names.POOL_SURFACE_AREA,
        () => <span>A<sub>p</sub></span>,
        () => <span className={adornmentClassNames}>m<sup>2</sup></span>,
        greaterThanZero,
        Number
    ],[
        names.WIND_SPEED,
        () => <span>u<sub>w</sub></span>,
        () => 'm/s',
        greaterThanZero,
        Number
    ],[
        names.ABSOLUTE_TEMPERATURE,
        () => 'T',
        () => 'K',
        greaterThanZero,
        Number
    ],[
        names.ADIABATIC_EXPANSION,
        () => <span>&gamma;</span>,
        () => <i className={adornmentClassNames}>no unit</i>,
        greaterThanZero,
        Number
    ],[
        names.ATMOSPHERIC_PRESSURE,
        () => 'pa',
        () => 'Pa',
        greaterThanZero,
        Number
    ],[
        names.CONTAINER_PRESSURE,
        () => 'p',
        () => 'Pa',
        greaterThanZero,
        Number
    ],[
        names.CRITICAL_GAS_PRESSURE,
        () => <span>p<sub>c</sub></span>,
        () => 'Pa',
        greaterThanZero,
        Number
    ],[
        names.COMPRESSIBILITY_FACTOR,
        () => 'Z',
        () => <i>no unit</i>,
        greaterThanZero,
        Number
    ],[
        names.AIR_ENTERING_ROOM_FLOW_RATE,
        () => <span>Q<sub>1</sub></span>,
        () => <span className={adornmentClassNames}>m<sup>3</sup>/s</span>,
        greaterThanZero,
        Number
    ],[
        names.AIR_CHANGE_FREQUENCY,
        () => 'C',
        () => <span className={adornmentClassNames}>s<sup>-1</sup></span>,
        greaterThanZero,
        Number
    ],[
        names.ROOM_DIMENSION_DEPTH,
        () => <span>L</span>,
        () => 'm',
        greaterThanZero,
        Number
    ],[
        names.ROOM_DIMENSION_HEIGHT,
        () => <span>H</span>,
        () => 'm',
        greaterThanZero,
        Number
    ],[
        names.ROOM_DIMENSION_WIDTH,
        () => <span>B</span>,
        () => 'm',
        greaterThanZero,
        Number
    ],[
        names.VENTILATION_EFFICIENCY_FACTOR,
        () => <i>f</i>,
        () => <i className={adornmentClassNames}>no unit</i>,
        greaterThanZero,
        Number
    ]
]

// export const filterReleaseRateFields = (definitions, fieldValues) => {
//     const performReleaseCalculation = fieldValues.calculateReleaseRate === 'yes'
//     const isGasCalculation = fieldValues.liquidOrGas === 'gas'
//     const hasReleaseRateInKgPerSecond = fieldValues.releaseRateInKgPerSecond === 'yes'
//     const isEvaporationFromPool = fieldValues.poolLeakage === 'yes'
    
//     const backgroundConcentration = fieldValues.indoorOutdoor === 'indoors' ? [names.AIR_ENTERING_ROOM_FLOW_RATE, /*names.AIR_CHANGE_FREQUENCY,*/ names.ROOM_DIMENSION_DEPTH, names.ROOM_DIMENSION_HEIGHT, names.ROOM_DIMENSION_WIDTH/*, names.MIXING_SAFETY_FACTOR*/] : []

//     const namesForSelectedValues = () => {
//         const baseAndB5 = [names.EVAPORATION_RATE, names.MOLAR_MASS, names.GAS_DENSITY]
//         if (!performReleaseCalculation && isGasCalculation && !hasReleaseRateInKgPerSecond) {
//             return base
//         } else if (!performReleaseCalculation && !isGasCalculation && !hasReleaseRateInKgPerSecond) {
//             return base
//         } else if (!performReleaseCalculation && hasReleaseRateInKgPerSecond) {
//             return baseAndB5
//         } else if (performReleaseCalculation && !isGasCalculation && !isEvaporationFromPool) {
//             return baseAndB5.concat([names.DISCHARGE_COEFFICIENT, names.CROSS_SECTION_AREA, names.PRESSURE_DIFFERENCE])
//         } else if (performReleaseCalculation && !isGasCalculation && isEvaporationFromPool) {
//             return baseAndB5.concat([names.WIND_SPEED, names.POOL_SURFACE_AREA, names.PRESSURE_DIFFERENCE, names.ABSOLUTE_TEMPERATURE])
//         } else if (performReleaseCalculation && isGasCalculation) {
//             return baseAndB5.concat([names.ADIABATIC_EXPANSION, names.ATMOSPHERIC_PRESSURE, names.ABSOLUTE_TEMPERATURE, names.DISCHARGE_COEFFICIENT, names.CROSS_SECTION_AREA, names.COMPRESSIBILITY_FACTOR, names.PRESSURE_DIFFERENCE])
//         } else {
//             // TODO: Show error and send to crash log
//         }
//     }

//     const nameCollection = backgroundConcentration.concat(namesForSelectedValues())
//     return _.intersectionWith(definitions, nameCollection, (def, name) => def[0] === name)
// }

const groupByFunc = (def) => {
    return _.head(_.split(def[0], '.', 2))
}

export const filterFields = (definitions, fieldValues) => {
    const performReleaseCalculation = fieldValues.calculateReleaseRate === 'yes'
    const isGasCalculation = fieldValues.liquidOrGas === 'gas'
    const hasReleaseRateInKgPerSecond = fieldValues.releaseRateInKgPerSecond === 'yes'
    const isEvaporationFromPool = fieldValues.poolLeakage === 'yes'
    
    const backgroundConcentration = fieldValues.indoorOutdoor === 'indoors' ? [names.AIR_ENTERING_ROOM_FLOW_RATE, /*names.AIR_CHANGE_FREQUENCY,*/ names.ROOM_DIMENSION_DEPTH, names.ROOM_DIMENSION_HEIGHT, names.ROOM_DIMENSION_WIDTH/*, names.MIXING_SAFETY_FACTOR*/] : []

    const namesForSelectedValues = () => {
        const base = [names.VOLUMETRIC_GAS_FLOW_RATE, names.SAFETY_FACTOR, names.LOWER_FLAMMABLE_LIMIT, names.BACKGROUND_CONCENTRATION, names.VENTILATION_EFFICIENCY_FACTOR]
        const baseAndB5 = base.concat([names.EVAPORATION_RATE, names.MOLAR_MASS, names.GAS_DENSITY])
        if (!performReleaseCalculation && isGasCalculation && !hasReleaseRateInKgPerSecond) {
            return base
        } else if (!performReleaseCalculation && !isGasCalculation && !hasReleaseRateInKgPerSecond) {
            return base
        } else if (!performReleaseCalculation && hasReleaseRateInKgPerSecond) {
            return baseAndB5
        } else if (performReleaseCalculation && !isGasCalculation && !isEvaporationFromPool) {
            return baseAndB5.concat([names.DISCHARGE_COEFFICIENT, names.CROSS_SECTION_AREA, names.PRESSURE_DIFFERENCE])
        } else if (performReleaseCalculation && !isGasCalculation && isEvaporationFromPool) {
            return baseAndB5.concat([names.WIND_SPEED, names.POOL_SURFACE_AREA, names.PRESSURE_DIFFERENCE, names.ABSOLUTE_TEMPERATURE])
        } else if (performReleaseCalculation && isGasCalculation) {
            return baseAndB5.concat([names.ADIABATIC_EXPANSION, names.ATMOSPHERIC_PRESSURE, names.ABSOLUTE_TEMPERATURE, names.DISCHARGE_COEFFICIENT, names.CROSS_SECTION_AREA, names.COMPRESSIBILITY_FACTOR, names.PRESSURE_DIFFERENCE])
        } else {
            // TODO: Show error and send to crash log
        }
    }

    const nameCollection = backgroundConcentration.concat(namesForSelectedValues())
    const filtered = _.intersectionWith(definitions, nameCollection, (def, name) => def[0] === name)

    return _.groupBy(filtered, groupByFunc)
}

export const ccToDisplayString = str => {
    const fieldName = _.last(str.split('.'))
    return fieldName
        .replace(/([A-Z][a-z]+)/g, ' $1')
        .trim()
        .replace(/(\w)/, (match) => match.toUpperCase())
}
