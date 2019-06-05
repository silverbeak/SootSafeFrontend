import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

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