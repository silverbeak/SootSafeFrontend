import React from 'react'
import * as _ from 'lodash'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

const newSketchTemplate = {
    metadata: {
        name: {
            name: 'Sketch name',
            type: String,
            path: 'metadata.name',
            value: '',
        },
        targetFirePressure: {
            name: 'Target fire pressure',
            type: Number,
            path: 'metadata.targetFirePressure',
            value: 1500
        }
    }
}

class NewSketchDialog extends React.Component {

    constructor(props) {
        super(props)
        this.state = _.merge({}, newSketchTemplate)
    }

    submitNew() {
        this.props.createNew(this.state)
        this.props.dismiss()
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
                <DialogTitle>New sketch</DialogTitle>
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

                    <TextField
                        margin='dense'
                        id='targetFirePressure'
                        label='Target fire pressure'
                        type='number'
                        onChange={this.updateMetadata('metadata.targetFirePressure.value')}
                        value={this.state.metadata.targetFirePressure.value}
                        fullWidth
                    />
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Cancel
                        </Button>
                        <Button 
                            color="primary"
                            onClick={() => {
                                this.props.onClose()
                                this.props.submitNew(this.state)
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

export default NewSketchDialog
