import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

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