import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const releaseTypeStep = (handleChange, props, fields) => {
    const {classes} = props
    return (
        <div>
            <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">Release type</FormLabel>
                <RadioGroup
                    aria-label="releaseType"
                    name="releaseType"
                    className={classes.group}
                    value={fields.releaseType}
                    onChange={handleChange('releaseType')}
                >
                    <FormControlLabel value="Jet" control={<Radio />} label="Unimpeded jet with high velocity" />
                    <FormControlLabel value="DiffusiveJet" control={<Radio />} label="Diffusive jet with low velocity" />
                    <FormControlLabel value="HeavyGas" control={<Radio />} label="Heavy gas or vapours" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default releaseTypeStep