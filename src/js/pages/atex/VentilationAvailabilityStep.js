import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

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