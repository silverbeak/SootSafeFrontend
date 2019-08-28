import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    progressWrapper: {
        position: "relative",
        marginTop: theme.spacing(2),
        left: theme.spacing(40),
    }
}));

export default function CalculateSpeedDial() {

    const classes = useStyles();
    
    return (
        <div className={classes.progressWrapper}>
            <CircularProgress size="3em" className={classes.progress} />
        </div>
    )
}
