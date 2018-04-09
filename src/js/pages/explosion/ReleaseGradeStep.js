import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

const releaseGradeStep = (handleChange, props) => {
    const {classes} = props

    return (
        <div>
            <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">Release grade</FormLabel>
                <RadioGroup
                    aria-label="gradeOfRelease"
                    name="gradeOfRelease"
                    className={classes.group}
                    value={props.fields.gradeOfRelease}
                    onChange={handleChange('gradeOfRelease')}
                >
                    <FormControlLabel value='Primary' control={<Radio />} label='Primary' />
                    <FormControlLabel value='Secondary' control={<Radio />} label='Secondary' />
                    <FormControlLabel value='Continuous' control={<Radio />} label='Continuous' />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default releaseGradeStep