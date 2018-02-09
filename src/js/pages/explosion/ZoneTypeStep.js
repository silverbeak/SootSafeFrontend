import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

const zoneTypeStep = (handleChange, props) => {
    const {classes} = props
    return (
        <div>
            <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">Zone type</FormLabel>
                <RadioGroup
                    aria-label="zoneType"
                    name="zoneType"
                    className={classes.group}
                    value={props.fields.zoneType}
                    onChange={handleChange('zoneType')}
                >
                    <FormControlLabel value="0" control={<Radio />} label="Zone 0" />
                    <FormControlLabel value="1" control={<Radio />} label="Zone 1" />
                    <FormControlLabel value="2" control={<Radio />} label="Zone 2" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default zoneTypeStep