import React from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import ErrorIcon from '@material-ui/icons/Error'
import InputAdornment from '@material-ui/core/InputAdornment'

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

const valueCardStyle = {
    marginLeft: "2em",
    marginRight: "2em"
}

const validateFieldValue = (field, value) => {
    return !!field[3] ? field[3](value) : ''
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
    const errorMessage = validateFieldValue(fieldName, myValue)

    const unitAdornment = <InputAdornment position="end" className="unit-adornment">{fieldName[2]()}</InputAdornment>

    return (
        <Paper className={styles.root} style={valueCardStyle} elevation={4} key={fieldName[0]}>
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
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={!!errorMessage}
                    margin="normal"
                    InputProps={{
                        endAdornment: unitAdornment
                    }}
                />
                {makeErrorMessage(errorMessage)}
            </div>
        </Paper>
    )
}
