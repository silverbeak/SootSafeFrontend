import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import { connect } from 'react-redux'
import { acknowledgeNotification } from '../actions/notification-actions'

import * as _ from '../../../node_modules/lodash/lodash.min.js'

class Notifier extends React.Component {

    constructor(props) {
        super(props)
        this.state = { open: false }
    }

    state = {
        open: false,
    }

    handleClick = () => {
        this.setState({ open: true });
    }

    handleRequestClose = (event, reason) => {
        console.log('Closing', reason)
        if (reason === 'clickaway') {
            return;
        }

        this.props.acknowledgeNotification(this.state.notification.id)
        this.setState({ open: false });
    }

    componentWillReceiveProps(nextProps) {
        // TODO: Fix this, it will only show the first notification it finds. Maybe we need some sort of local queue
        let unacked = _.find(nextProps.notifications.notifications, n => !n.acknowledged)
        if (unacked) {
            this.setState({ notification: unacked, open: true })
        }
    }

    render() {
        if (!this.state.notification) return ''
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={3000}
                onRequestClose={this.handleRequestClose.bind(this)}
                SnackbarContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.state.notification.notification}</span>}
                action={[
                    // <Button key="undo" color="accent" dense onClick={this.handleRequestClose.bind(this)}>
                    //     UNDO
                    // </Button>,
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        // className={classes.close}
                        onClick={this.handleRequestClose.bind(this)}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        notifications: state.notifications
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        acknowledgeNotification: notificationId => {
            dispatch(acknowledgeNotification(notificationId))
        }
    }
}

export const StatedNotifier = connect(mapStateToProps, mapDispatchToProps)(Notifier)

export default Notifier