import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

const ventilationAvailabilityStep = (handleChange, props) => {
    const { classes } = props

    return (
        <div>
            <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">Ventilation availability</FormLabel>
                <RadioGroup
                    aria-label="ventilationavailability"
                    name="ventilationavailability"
                    className={classes.group}
                    value={props.fields.ventilationAvailability}
                    onChange={handleChange('ventilationAvailability')}
                >
                    <FormControlLabel value="Good" control={<Radio />} label="Good" />
                    <FormControlLabel value="Fair" control={<Radio />} label="Fair" />
                    <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default ventilationAvailabilityStep