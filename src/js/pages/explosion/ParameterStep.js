import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

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

    const generateNumberField = (fieldName) => {
        return (
            <Paper className={styles.root} elevation={4} key={fieldName[0]}>
                <h4>
                    {ccToDisplayString(fieldName[0])} ({fieldName[1]()})
                </h4>
                <div className="field-and-unit">
                    <TextField
                        id="number"
                        // label={fieldName[0]}
                        value={_.get(props.fields, fieldName[0])}
                        onChange={handleChange(fieldName[0])}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    {fieldName[2]()}
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
