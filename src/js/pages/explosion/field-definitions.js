import React from 'react'

import * as _ from '../../../../node_modules/lodash/lodash.min'

import * as names from './field-names'

export const fieldDefinitions = [
    [
        names.VOLUMETRIC_GAS_FLOW_RATE,
        () => <span>Q<sub>g</sub></span>,
        () => <span>m<sup>3</sup>/s</span>
    ],[
        names.SAFETY_FACTOR,
        () => 'k',
        () => <i>no unit</i>
    ],[
        names.LOWER_FLAMMABLE_LIMIT,
        () => 'LFL',
        () => 'vol/vol'
    ],[
        names.MASS_RELEASE_RATE,
        () => <span>W<sub>g</sub></span>,
        () => 'kg/s'
    ],[
        names.EVAPORATION_RATE,
        () => <span>W<sub>e</sub></span>,
        () => 'kg/s'
    ],[
        names.MOLAR_MASS,
        () => 'M',
        () => 'kg/mol'
    ],[
        names.GAS_DENSITY,
        () => <span>&rho;<sub>g</sub></span>,
        () => <span>kg/m<sup>3</sup></span>
    ],[
        names.DISCHARGE_COEFFICIENT,
        () => <span>C<sub>d</sub></span>,
        () => <i>no unit</i>
    ],[
        names.CROSS_SECTION_AREA,
        () => 'S',
        () => <span>m<sup>2</sup></span>
    ],[
        names.PRESSURE_DIFFERENCE,
        () => 'p',
        () => 'Pa'
    ],[
        names.POOL_SURFACE_AREA,
        () => <span>A<sub>p</sub></span>,
        () => <span>m<sup>2</sup></span>
    ],[
        names.WIND_SPEED,
        () => <span>u<sub>w</sub></span>,
        () => 'm/s'
    ],[
        names.ABSOLUTE_TEMPERATURE,
        () => 'T',
        () => 'K'
    ],[
        names.ADIABATIC_EXPANSION,
        () => <span>&gamma;</span>,
        () => <i>no unit</i>
    ],[
        names.ATMOSPHERIC_PRESSURE,
        () => 'pa',
        () => 'Pa'
    ],[
        names.CONTAINER_PRESSURE,
        () => 'p',
        () => 'Pa'
    ],[
        names.CRITICAL_GAS_PRESSURE,
        () => <span>p<sub>c</sub></span>,
        () => 'Pa'
    ],[
        names.COMPRESSIBILITY_FACTOR,
        () => 'Z',
        () => <i>no unit</i>
    ],[
        names.AIR_ENTERING_ROOM_FLOW_RATE,
        () => <span>Q<sub>1</sub></span>,
        () => <span>m<sup>3</sup>/s</span>
    ],[
        names.AIR_CHANGE_FREQUENCY,
        () => 'C',
        () => <span>s<sup>-1</sup></span>
    ],[
        names.ROOM_DIMENSION_DEPTH,
        () => <span>L</span>,
        () => <span>m</span>
    ],[
        names.ROOM_DIMENSION_HEIGHT,
        () => <span>H</span>,
        () => <span>m</span>
    ],[
        names.ROOM_DIMENSION_WIDTH,
        () => <span>B</span>,
        () => <span>m</span>
    ],[
        names.VENTILATION_EFFICIENCY_FACTOR,
        () => <i>f</i>,
        () => <i>no unit</i>
    ]
]

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
    return _.intersectionWith(definitions, nameCollection, (def, name) => def[0] === name)
}

export const ccToDisplayString = str => {
    const fieldName = _.last(str.split('.'))
    return fieldName
        .replace(/([A-Z][a-z]+)/g, ' $1')
        .trim()
        .replace(/(\w)/, (match) => match.toUpperCase())
}
