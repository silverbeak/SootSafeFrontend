import React from 'react'

import { generateNumberField } from './field-generator'

import { fieldDefinitions, filterFields, ccToDisplayString } from './field-definitions'

const parameterStep = (handleChange, props) => {

    const needReleaseRateUnit = !props.fields.calculateReleaseRate

    const releaseRateUnitQuestion = needReleaseRateUnit
        ? <h2>Release Rate Unit</h2>
        : <h4>No Release Rate Unit Needed</h4>

    return (
        <div>
            {filterFields(fieldDefinitions, props.fields).map(generateNumberField(handleChange, props))}
        </div>
    )
}

export default parameterStep
