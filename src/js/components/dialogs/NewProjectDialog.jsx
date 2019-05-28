import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

class NewProjectDialog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }

    submitNew() {
        this.props.createNew(this.state.name, this.props.projectId)
        this.props.onClose()
    }

    render() {
        const { open, onClose } = this.props
        return (
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>New project</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Name'
                        type='text'
                        onChange={event => this.setState({ name: event.target.value })}
                        value={this.state.name}
                        fullWidth
                    />
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.props.submitNew(this.state)} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}

export default NewProjectDialog
