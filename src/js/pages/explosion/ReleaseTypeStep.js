import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

const releaseTypeStep = (handleChange, props) => {
    const {classes} = props
    return (
        <div>
            <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">Release type</FormLabel>
                <RadioGroup
                    aria-label="releaseType"
                    name="releaseType"
                    className={classes.group}
                    value={props.fields.releaseType}
                    onChange={handleChange('releaseType')}
                >
                    <FormControlLabel value="0" control={<Radio />} label="Unimpeded jet with high velocity" />
                    <FormControlLabel value="1" control={<Radio />} label="Diffusive jet with low velocity" />
                    <FormControlLabel value="2" control={<Radio />} label="Heavy gas or vapours" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default releaseTypeStep