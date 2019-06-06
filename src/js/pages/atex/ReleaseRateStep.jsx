import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const evaporationFromPoolQuery = (handleChange, props, fields) => {
    const { classes } = props
    if (fields.calculateReleaseRate === 'yes' && fields.liquidOrGas === 'liquid') {
        return (
            <div>
                <hr />
                <FormControl component="fieldset" required className={classes.formControl}>
                    <FormLabel component="legend">Is the evaporation from a pool?</FormLabel>
                    <RadioGroup
                        aria-label="poolLeakage"
                        name="poolLeakage"
                        className={classes.group}
                        value={fields.poolLeakage}
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

const releaseRateStep = (handleChange, props, fields) => {
    const { classes } = props
    return (
        <div>
            <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">Do you wish to calculate the release rate?</FormLabel>
                <RadioGroup
                    aria-label="calculateReleaseRate"
                    name="calculateReleaseRate"
                    className={classes.group}
                    value={fields.calculateReleaseRate}
                    onChange={handleChange('calculateReleaseRate')}
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes, I need to calculate the release rate" />
                    <FormControlLabel value="no" control={<Radio />} label="No, I already have it" />
                </RadioGroup>

            </FormControl>
            
            {evaporationFromPoolQuery(handleChange, props, fields)}
        </div>
    )
}

export default releaseRateStep