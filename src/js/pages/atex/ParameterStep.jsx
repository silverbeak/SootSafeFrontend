import React from 'react'
import * as _ from 'lodash/lodash.min'

import { generateNumberField } from './field-generator'

import { fieldDefinitions, filterFields, ccToDisplayString } from './field-definitions'

const styles = {
    parameterGroup: {
        background: 'ghostwhite',
        paddingTop: '.7em',
        paddingBottom: '.7em',
        marginTop: '1em',
        marginBottom: '1em',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    parameterList: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    }
}



const handleNumberChange = originalHandler => field => event => {
    const floatValue = parseFloat(event.target.value)
    const newEvent = { target: { value: floatValue } }
    originalHandler(field)(newEvent)
}

const parameterStep = (handleChange, props, fields) => {

    // const needReleaseRateUnit = !props.fields.calculateReleaseRate

    // const releaseRateUnitQuestion = needReleaseRateUnit
    //     ? <h2>Release Rate Unit</h2>
    //     : <h4>No Release Rate Unit Needed</h4>

    const groupedFields = filterFields(fieldDefinitions, fields)


    const singleGroup = (group, name) => {
        return (
            <div style={styles.parameterGroup} key={name}>
                <h3>{ccToDisplayString(name)}</h3>
                {_.values(group).map((generateNumberField(handleNumberChange(handleChange), fields)))}
            </div>
        )
    }

    return (
        <div id="paramter-list" style={styles.parameterList}>
            {
                _.map(groupedFields, singleGroup)
            }
        </div>
    )
}

export default parameterStep
