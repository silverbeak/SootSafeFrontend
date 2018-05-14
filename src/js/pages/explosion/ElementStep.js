import React from 'react'
import Radio, { RadioGroup } from '@material-ui/core/Radio'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const elementStep = (handleChange, props) => {
    const { classes } = props

    return (
        <div>
            <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">Element</FormLabel>
                <br />
                <Select
                    value={props.fields.casNumber}
                    onChange={props.elementUpdated}
                    inputProps={{
                        name: 'element',
                        id: 'element',
                    }}
                >
                    { props.gasList.map(e => <MenuItem value={e.CASnr} key={e.CASnr}> {e.name} </MenuItem>)}
                </Select>
            </FormControl>
        </div>
    )
}

export default elementStep