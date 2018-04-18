import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Tooltip from 'material-ui/Tooltip'
import ErrorIcon from 'material-ui-icons/Error'

import * as names from './field-names'
import * as _ from '../../../../node_modules/lodash/lodash.min'

import { fieldDefinitions, filterFields, ccToDisplayString } from './field-definitions'

const parameterStep = (handleChange, props) => {
    const { classes } = props

    const styles = theme => ({
        root: theme.mixins.gutters({
            paddingTop: "1.6em",
            paddingBottom: "1.6em",
            marginTop: theme.spacing.unit * 3
        })
    })

    const needReleaseRateUnit = !props.fields.calculateReleaseRate

    const releaseRateUnitQuestion = needReleaseRateUnit
        ? <h2>Release Rate Unit</h2>
        : <h4>No Release Rate Unit Needed</h4>


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

    const generateNumberField = (fieldName) => {
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

    return (
        <div>
            {filterFields(fieldDefinitions, props.fields).map(generateNumberField)}
        </div>
    )
}

export default parameterStep
