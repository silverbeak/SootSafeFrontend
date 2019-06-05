import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

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
                    <FormControlLabel value='Continuous' control={<Radio />} label='Continuous' />
                    <FormControlLabel value='Primary' control={<Radio />} label='Primary' />
                    <FormControlLabel value='Secondary' control={<Radio />} label='Secondary' />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default releaseGradeStep