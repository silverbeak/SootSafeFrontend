import React from 'react'

import { fieldDefinitions, filterFields, ccToDisplayString } from './field-definitions'

const calculateStep = (handleChange, props) => {
    const { classes } = props

    const displayVerification = field => [
        <div className="Rtable-cell title" key={`${field[0]}-label`}>
            {ccToDisplayString(field[0])} ({field[1]()})
        </div>,
        <div className="Rtable-cell value" key={`${field[0]}-value`}>
            {props.fields[field[0]]} &nbsp; {field[2]()}
        </div>
    ]

    const listFieldsForVerification = (fields) => {
        return (
            <div className="Rtable Rtable--2cols">
                {filterFields(fieldDefinitions, fields).map(displayVerification)}
            </div>
        )
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