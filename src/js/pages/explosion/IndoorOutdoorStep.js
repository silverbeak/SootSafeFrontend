import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

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