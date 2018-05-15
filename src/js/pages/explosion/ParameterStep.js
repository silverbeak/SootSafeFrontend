import React from 'react'
import * as _ from '../../../../node_modules/lodash/lodash.min'

import { generateNumberField } from './field-generator'

import { fieldDefinitions, filterFields, ccToDisplayString } from './field-definitions'

const parameterGroup = {
    background: 'ghostwhite',
    paddingTop: '.7em',
    paddingBottom: '.7em',
    marginTop: '1em',
    marginBottom: '1em'
}

const parameterStep = (handleChange, props) => {

    const needReleaseRateUnit = !props.fields.calculateReleaseRate

    const releaseRateUnitQuestion = needReleaseRateUnit
        ? <h2>Release Rate Unit</h2>
        : <h4>No Release Rate Unit Needed</h4>

    const groupedFields = filterFields(fieldDefinitions, props.fields)

    
    const singleGroup = (group, name) => {
        return (
            <div style={parameterGroup} key={name}>
                <h3>{ccToDisplayString(name)}</h3>
                {_.values(group).map((generateNumberField(handleChange, props)))}
            </div>
        )
    }

    return (
        <div>
        {
            _.map(groupedFields, singleGroup)
        }
        </div>
    )
}

export default parameterStep
