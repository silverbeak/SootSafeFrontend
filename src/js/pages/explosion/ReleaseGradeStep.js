import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

const releaseGradeStep = (handleChange, props) => {
    const {classes} = props

    const getReleaseGradeOptions = zoneType => {
        let values = []
        switch(zoneType) {
            case '0': 
                values = [['A', 'Continuous'], ['B', 'Continuous/primary'], ['C', 'Secondary'], ['D', 'Secondary/no release']]
                break
            case '1': 
                values = [['A', 'Primary'], ['B', 'Primary/secondary'], ['C', 'Secondary/no release'], ['D', 'no release']]
                break
            case '2': 
                values = [['A', 'Secondary'], ['B', 'Secondary/no release'], ['C', 'no release'], ['D', 'no release']]
                break
        }

        return values.map(v => <FormControlLabel key={v[0]} value={v[0]} control={<Radio />} label={v[1]} />)
    }

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
                    { getReleaseGradeOptions(props.fields.zoneType) }
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default releaseGradeStep