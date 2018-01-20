import React from 'react'

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
    ]
]
