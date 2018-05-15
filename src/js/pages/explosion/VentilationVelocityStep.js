import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import * as _ from '../../../../node_modules/lodash/lodash.min'

const ventilationVelocityStep = (handleChange, props) => {
    const { classes } = props

    return (
        <div>
            <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">Location</FormLabel>
                <RadioGroup
                    aria-label="obstructed"
                    name="obstructed"
                    className={classes.group}
                    value={_.get(props.fields, 'ventilationVelocityValues.obstructed')}
                    onChange={handleChange('ventilationVelocityValues.obstructed')}
                >
                    <FormControlLabel value="Obstructed" control={<Radio />} label="Obstructed" />
                    <FormControlLabel value="Unobstructed" control={<Radio />} label="Unobstructed" />
                </RadioGroup>


                <FormLabel component="legend">Elevation from ground level</FormLabel>
                <Select
                    value={_.get(props.fields, 'ventilationVelocityValues.elevation')}
                    onChange={handleChange('ventilationVelocityValues.elevation')}
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