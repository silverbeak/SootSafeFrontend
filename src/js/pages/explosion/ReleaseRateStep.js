import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

const releaseRateStep = (handleChange, props) => {
    const {classes} = props
    return (
        <div>
            <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">Do you wish to calculate the release rate?</FormLabel>
                <RadioGroup
                    aria-label="calculateReleaseRate"
                    name="calculateReleaseRate"
                    className={classes.group}
                    value={props.fields.calculateReleaseRate}
                    onChange={handleChange('calculateReleaseRate')}
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default releaseRateStep