import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

const backgroundConcentrationStep = (handleChange, props) => {
    const {classes} = props
    return (
        <div>
            <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">Is the background concentration > 25% of LFL?</FormLabel>
                <RadioGroup
                    aria-label="backgroundconcentration"
                    name="backgroundconcentration"
                    className={classes.group}
                    value={props.fields.backgroundConcentration}
                    onChange={handleChange('backgroundConcentration')}
                >
                    <FormControlLabel value="greater" control={<Radio />} label="Yes, greater than 25% of LFL" />
                    <FormControlLabel value="less" control={<Radio />} label="No, less than 25% of LFL" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default backgroundConcentrationStep