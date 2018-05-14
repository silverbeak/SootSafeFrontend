import React from 'react'
import { connect } from 'react-redux'
import { submitUserFeedback, toggleFeedbackDialog } from '../../actions/feedback-actions'
// import Button from '@material-ui/core/Button'
// import TextField from '@material-ui/core/TextField'
// import Dialog from '@material-ui/core/Dialog'
// import { withStyles } from '@material-ui/core/styles'
// import DialogActions from '@material-ui/core/DialogActions'
// import DialogContent from '@material-ui/core/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText'
// import DialogTitle from '@material-ui/core/DialogTitle'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog'

import { withStyles }from 'material-ui/styles'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
})

class FeedbackDialog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            multiline: 'Controlled',
            feedbackBody: '',
            showSubmitDialog: false
        }

    }

    handleChange = fieldName => change => {
        this.setState({
            feedbackBody: change.target.value
        })
    }

    handleClose = () => {
        this.props.toggleFeedbackDialog(false)
    }

    handleSubmit = () => {
        this.props.submitFeedback(this.state.feedbackBody)
        this.handleClose()
        this.showSubmitDialog()
    }

    showSubmitDialog = () => {
        const hideSubmitDialog = () => {
            this.setState({ showSubmitDialog: false })
        }
        this.setState({ showSubmitDialog: true })
        setTimeout(hideSubmitDialog, 5000)
    }

    submitDialog = () => {
        return (
            <Dialog
                open={this.state.showSubmitDialog}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Thank you!</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Your input makes SootSafe better...
                    </DialogContentText>

                    We will get to work on this as soon as we can!

                </DialogContent>
            </Dialog>
        )
    }

    render() {
        const { classes } = this.props;
        
        return (
            <span>
                <Dialog
                    open={this.props.showFeedbackDialog}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Give it to us straight!</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            We would love to hear what you have to say about SootSafe.com!
                        </DialogContentText>

                        <TextField
                            autoFocus
                            id="multiline-flexible"
                            label="Honesty goes a long way!"
                            multiline
                            rowsMax="10"
                            value={this.state.feedbackBody}
                            onChange={this.handleChange('feedbackBody')}
                            margin="dense"
                            rows="4"
                            style={{background: 'ghostwhite'}}
                            fullWidth
                        />

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Send feedback
                    </Button>
                    </DialogActions>
                </Dialog>
                {this.submitDialog()}
            </span>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        showFeedbackDialog: state.feedbacks.showFeedbackDialog
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submitFeedback: feedback => {
            dispatch(submitUserFeedback(feedback))
        },
        toggleFeedbackDialog: show => {
            dispatch(toggleFeedbackDialog(show))
        }
    }
}

const ConnectedFeedbackDialog = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FeedbackDialog))

export default ConnectedFeedbackDialog