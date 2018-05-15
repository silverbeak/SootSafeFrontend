import React from 'react'

import * as _ from '../../../../node_modules/lodash/lodash.min'
import { fieldDefinitions, filterFields, ccToDisplayString } from './field-definitions'

const calculateStep = (handleChange, props) => {
    const { classes } = props

    const displayVerification = field => [
        <div className="Rtable-cell title" key={`${field[0]}-label`}>
            {ccToDisplayString(field[0])} ({field[1]()})
        </div>,
        <div className="Rtable-cell value" key={`${field[0]}-value`}>
            {_.get(props.fields, field[0])} &nbsp; {field[2]()}
        </div>
    ]

    const listFieldGroup = (fields, name) => {
        return (
            <span key={`${name}-table`}>
                <h3>{ccToDisplayString(name)}</h3>
                <div className="Rtable Rtable--2cols">
                    {fields.map(displayVerification)}
                </div>
            </span>
        )
    }

    const listFieldsForVerification = fields => {
        return _.map(filterFields(fieldDefinitions, fields), listFieldGroup)
    }

    return (
        <div>
            {listFieldsForVerification(props.fields)}

            <div>
                <i>Please verify all values. Push the finish button to generate your report.</i>
            </div>
        </div>
    )
}

export default calculateStep