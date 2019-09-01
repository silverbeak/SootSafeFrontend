import React from 'react';
import CalculateSpeedDial from '../menus/CalculateSpeedDial';
import CalculationProgress from '../../components/misc/CalculationProgress'
import { makeStyles } from '@material-ui/core'
import { connect } from 'react-redux';

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
    },
    progressDisplay: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

const actionBox = function FidActionBox(props) {
    const classes = useStyles();

    return (
        <div className={classes.fidActionBox} >
            {
                props.displayGenericProgress ? 
                    <div className={classes.progressDisplay} >
                        <CalculationProgress />
                    </div>
                    :
                    <div className={classes.speedDialBox}>
                        <CalculateSpeedDial {...props} />
                    </div>
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        displayGenericProgress: state.notifications.displayGenericProgress,
    }
}

export default connect(mapStateToProps)(actionBox)