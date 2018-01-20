import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

import * as names from './field-names'

import * as _ from '../../../../node_modules/lodash/lodash.min'

import { fieldDefinitions } from './field-definitions'

const ccToDisplayString = str => {
    return str
        .replace(/([A-Z][a-z]+)/g, ' $1')
        .trim()
        .replace(/(\w)/, (match) => match.toUpperCase())
}

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

    const filterFields = (definitions, fieldValues) => {
        const performReleaseCalculation = fieldValues.calculateReleaseRate === 'yes'
        const isGasCalculation = fieldValues.liquidOrGas === 'gas'
        const hasReleaseRateInKgPerSecond = fieldValues.releaseRateInKgPerSecond === 'yes'
        const isEvaporationFromPool = fieldValues.poolLeakage === 'yes'

        const namesForSelectedValues = () => {
            const base = [names.VOLUMETRIC_GAS_FLOW_RATE, names.SAFETY_FACTOR, names.LOWER_FLAMMABLE_LIMIT]
            const baseAndB5 = base.concat([names.MASS_RELEASE_RATE, names.MOLAR_MASS, names.GAS_DENSITY])
            if (!performReleaseCalculation && isGasCalculation && !hasReleaseRateInKgPerSecond) {
                return base
            } else if (!performReleaseCalculation && !isGasCalculation && !hasReleaseRateInKgPerSecond) {
                return base
            } else if (!performReleaseCalculation && hasReleaseRateInKgPerSecond) {
                return baseAndB5
            } else if (performReleaseCalculation && !isGasCalculation && !isEvaporationFromPool) {
                return baseAndB5.concat([names.DISCHARGE_COEFFICIENT, names.CROSS_SECTION_AREA, names.PRESSURE_DIFFERENCE])
            } else if (performReleaseCalculation && !isGasCalculation && isEvaporationFromPool) {
                return baseAndB5.concat([names.WIND_SPEED, names.POOL_SURFACE_AREA, names.PRESSURE_DIFFERENCE, names.ABSOLUTE_TEMPERATURE])
            } else if (performReleaseCalculation && isGasCalculation) {
                return baseAndB5.concat([names.ADIABATIC_EXPANSION, names.ATMOSPHERIC_PRESSURE, names.ABSOLUTE_TEMPERATURE, names.DISCHARGE_COEFFICIENT, names.CROSS_SECTION_AREA, names.COMPRESSIBILITY_FACTOR, names.PRESSURE_DIFFERENCE])
            } else {
                // TODO: Show error and send to crash log
            }
        }

        return _.intersectionWith(definitions, namesForSelectedValues(), (def, name) => def[0] === name)
    }

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
                        value={props.fields[fieldName[0]]}
                        onChange={handleChange(fieldName[0])}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    { fieldName[2]() }
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
