import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

const ventilationVelocityStep = (handleChange, props) => {
    const { classes } = props

    return (
        <div>
            <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">Location</FormLabel>
                <RadioGroup
                    aria-label="obstructedorunobstructed"
                    name="obstructedorunobstructed"
                    className={classes.group}
                    value={props.fields.obstructedOrUnobstructed}
                    onChange={handleChange('obstructedOrUnobstructed')}
                >
                    <FormControlLabel value="obstructed" control={<Radio />} label="Obstructed" />
                    <FormControlLabel value="unobstructed" control={<Radio />} label="Unobstructed" />
                </RadioGroup>


                <FormLabel component="legend">Elevation from ground level</FormLabel>
                <Select
                    value={props.fields.elevation}
                    onChange={handleChange('elevation')}
                    inputProps={{
                        name: 'elevation',
                        id: 'elevation',
                    }}
                >
                    <MenuItem value={1}>1m</MenuItem>
                    <MenuItem value={2}>2m</MenuItem>
                    <MenuItem value={3}>3m</MenuItem>
                    <MenuItem value={4}>4m</MenuItem>
                    <MenuItem value={5}>5m</MenuItem>
                    <MenuItem value={6}>6m</MenuItem>
                    <MenuItem value={7}>7m</MenuItem>
                    <MenuItem value={8}>8m</MenuItem>
                    <MenuItem value={9}>9m</MenuItem>
                    <MenuItem value={10}>>10m</MenuItem>
                </Select>

            </FormControl>
        </div>
    )
}

export default ventilationVelocityStep