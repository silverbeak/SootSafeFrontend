import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const evaporationFromPoolQuery = (handleChange, props) => {
    const { classes } = props
    if (props.fields.calculateReleaseRate === 'yes' && props.fields.liquidOrGas === 'liquid') {
        return (
            <div>
                <hr />
                <FormControl component="fieldset" required className={classes.formControl}>
                    <FormLabel component="legend">Is the evaporation from a pool?</FormLabel>
                    <RadioGroup
                        aria-label="poolLeakage"
                        name="poolLeakage"
                        className={classes.group}
                        value={props.fields.poolLeakage}
                        onChange={handleChange('poolLeakage')}
                    >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </div>
        )
    } else {
        return <span></span>
    }
}

const releaseRateStep = (handleChange, props) => {
    const { classes } = props
    return (
        <div>
            <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">Do you wish to calculate the release rate?</FormLabel>
                <RadioGroup
                    aria-label="calculateReleaseRate"
                    name="calculateReleaseRate"
                    className={classes.group}
                    value={props.fields.calculateReleaseRate}
                    onChange={handleChange('calculateReleaseRate')}
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes, I need to calculate the release rate" />
                    <FormControlLabel value="no" control={<Radio />} label="No, I already have it" />
                </RadioGroup>

                {evaporationFromPoolQuery(handleChange, props)}
            </FormControl>
        </div>
    )
}

export default releaseRateStep