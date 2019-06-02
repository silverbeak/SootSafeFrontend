import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import * as _ from 'lodash'

const newProjectTemplate = {
    metadata: {
        name: {
            type: String,
            path: 'metadata.name',
            value: '',
        }
    }
}

class NewProjectDialog extends React.Component {

    constructor(props) {
        super(props)
        this.state = _.merge(newProjectTemplate)
    }

    submitNew() {
        this.props.createNew(this.state.name, this.props.projectId)
        this.props.onClose()
    }

    updateMetadata = fieldName => event => {
        const stateCopy = _.merge({}, this.state)
        _.set(stateCopy, fieldName, event.target.value)
        this.setState(stateCopy)
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
                        onChange={this.updateMetadata('metadata.name.value')}
                        value={this.state.metadata.name.value}
                        fullWidth
                    />
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Cancel
                        </Button>
                        <Button color="primary" onClick={() => {
                                    this.props.submitNew(this.state)
                                    this.props.onClose()
                                }}
                        >
                            Create
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}

export default NewProjectDialog
