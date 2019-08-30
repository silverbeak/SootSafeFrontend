import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { Save, Launch, InsertChart } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    speedDialWrapper: {
        display: 'flex',
    },
    speedDial: {
        marginLeft: 'auto',
    },
}));

const actions = [
    { icon: <Save />, name: 'Save', key: 'save' },
    { icon: <Launch />, name: 'Calculate', key: 'calculate' },
    { icon: <InsertChart />, name: 'Generate Report', key: 'generate_report' },
];

export default function CalculateSpeedDial({ handleActionByName }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleActionClick = actionName => () => {
        handleClick()
        handleActionByName(actionName)
    }

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className={classes.speedDialWrapper}>
            <SpeedDial
                ariaLabel="Actions"
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                onBlur={handleClose}
                onClick={handleClick}
                onClose={handleClose}
                onFocus={handleOpen}
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
                open={open}
                direction='left'
            >
                {actions.map(action => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipPlacement='bottom'
                        onClick={handleActionClick(action.key)}
                    />
                ))}
            </SpeedDial>
        </div>
    );
}
