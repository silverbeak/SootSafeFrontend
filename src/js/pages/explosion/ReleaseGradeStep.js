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
                    aria-label="releaseGrade"
                    name="releaseGrade"
                    className={classes.group}
                    value={props.fields.releaseGrade}
                    onChange={handleChange('releaseGrade')}
                >
                    <FormControlLabel value='primary' control={<Radio />} label='Primary' />
                    <FormControlLabel value='secondary' control={<Radio />} label='Secondary' />
                    <FormControlLabel value='continuous' control={<Radio />} label='Continuous' />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default releaseGradeStep