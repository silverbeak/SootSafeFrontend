import React, { Component } from 'react';
import CalculateSpeedDial from '../menus/CalculateSpeedDial';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    fidActionBox: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100%',
    },
    speedDialBox: {
        marginRight: '.4rem',
        marginBottom: '.4rem',
    }
}));

export default function FidActionBox(props) {
    const classes = useStyles();

    return (
        <div className={classes.fidActionBox} >
            <div className={classes.speedDialBox}>
                <CalculateSpeedDial {...props} />
            </div>
        </div>
    );
}
