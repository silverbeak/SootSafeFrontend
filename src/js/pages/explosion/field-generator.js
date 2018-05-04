import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Tooltip from 'material-ui/Tooltip'
import ErrorIcon from 'material-ui-icons/Error'

import { fieldDefinitions, filterFields, ccToDisplayString } from './field-definitions'
import * as _ from '../../../../node_modules/lodash/lodash.min'
import * as names from './field-names'

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: "1.6em",
        paddingBottom: "1.6em",
        marginTop: theme.spacing.unit * 3
    })
})

const validateFieldValue = (field, value) => {
    if (field[3]) {
        const errorMessage = field[3](value)
        return {
            errorMessage,
            errorClass: errorMessage === '' ? '' : 'value-error'
        }
    }
    return {}
}

const makeErrorMessage = msg => {
    if (msg) {
        return (
            <Tooltip id="tooltip-icon" title={msg}>
                <ErrorIcon className="value-error-icon" />
            </Tooltip>
        )
    } else {
        return <span></span>
    }
}

export const generateNumberField = (handleChange, props) => (fieldName) => {
    const { classes } = props
    const myValue = _.get(props.fields, fieldName[0])
    const { errorClass, errorMessage } = validateFieldValue(fieldName, myValue)
    const className = errorClass ? errorClass : classes.textField
    
    return (
        <Paper className={styles.root} elevation={4} key={fieldName[0]}>
            <h4>
                {ccToDisplayString(fieldName[0])} ({fieldName[1]()})
            </h4>
            <div className="field-and-unit">
                <TextField
                    id="number"
                    // label={fieldName[0]}
                    value={myValue}
                    onChange={handleChange(fieldName[0])}
                    type="number"
                    className={className}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                {fieldName[2]()}
                {makeErrorMessage(errorMessage)}
            </div>
        </Paper>
    )
}
