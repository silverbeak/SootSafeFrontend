import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

const poolStep = (handleChange, props) => {
    const {classes} = props
    return (
        <div>
            <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">Is the leakage from a pool?</FormLabel>
                <RadioGroup
                    aria-label="poolLeakage"
                    name="poolLeakage"
                    className={classes.group}
                    value={props.fields.poolLeakage}
                    onChange={handleChange('poolLeakage')}
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default poolStep