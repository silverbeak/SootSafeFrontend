import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

const gasOrLiquidStep = (handleChange, props) => {
    const {classes} = props
    return (
        <div>
            <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">What is the primary leakage state?</FormLabel>
                <RadioGroup
                    aria-label="gasorliquid"
                    name="gasorliquid"
                    className={classes.group}
                    value={props.fields.liquidOrGas}
                    onChange={handleChange('liquidOrGas')}
                >
                    <FormControlLabel value="liquid" control={<Radio />} label="Liquid" />
                    <FormControlLabel value="gas" control={<Radio />} label="Gas" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default gasOrLiquidStep