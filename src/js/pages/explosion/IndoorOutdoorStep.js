import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

const indoorOutdoorStep = (handleChange, props) => {
    const {classes} = props
    return (
        <div>
            <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">Is the leakage indoors or outdoors?</FormLabel>
                <RadioGroup
                    aria-label="indooroutdoor"
                    name="indooroutdoor"
                    className={classes.group}
                    value={props.fields.indoorOutdoor}
                    onChange={handleChange('indoorOutdoor')}
                >
                    <FormControlLabel value="indoors" control={<Radio />} label="Indoors" />
                    <FormControlLabel value="outdoors" control={<Radio />} label="Outdoors" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default indoorOutdoorStep