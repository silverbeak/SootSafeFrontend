import React from 'react'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import { createNewProject, createNewSketch } from '../../actions/backend-communicator-actions'
import * as dialogActions from '../../actions/dialog-actions'

class NewProjectDialog extends React.Component {

    constructor(props) {
        super(props)
        this.state = { name: '' }
    }

    handleRequestClose() {
        this.props.dismiss()
    }

    submitNew() {
        this.props.createNew(this.state.name, this.props.projectId)
        this.props.dismiss()
    }

    render() {
        const open = this.props.open || false
        return <Dialog
            open={open}
            onRequestClose={this.handleRequestClose.bind(this)}
        >
            <DialogTitle>{this.props.title}</DialogTitle>
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
                    <Button onClick={this.handleRequestClose.bind(this)} color="primary">
                        Cancel
                </Button>
                    <Button onClick={this.submitNew.bind(this)} color="primary">
                        Create
                </Button>
                </DialogActions>
            </DialogContent>

        </Dialog>
    }
}

const mapStateToPropsForProject = (state, ownProps) => {
    return {
        open: state.dialogs.newProjectDialog,
        title: 'New Project'
    }
}

const mapDispatchToPropsForProject = (dispatch, ownProps) => {
    return {
        createNew: projectName => {
            dispatch(createNewProject(projectName))
        },
        dismiss: () => {
            dispatch(dialogActions.dismissNewProjectDialog())
        }
    }
}

export const StatedNewProjectDialog = connect(mapStateToPropsForProject, mapDispatchToPropsForProject)(NewProjectDialog)


const mapStateToPropsForSketch = (state, ownProps) => {
    return {
        open: state.dialogs.newSketchDialog,
        title: 'New Sketch',
        projectId: state.dialogs.projectId
    }
}

const mapDispatchToPropsForSketch = (dispatch, ownProps) => {
    return {
        createNew: (sketchName, projectId) => {
            dispatch(createNewSketch(sketchName, projectId))
        },
        dismiss: () => {
            dispatch(dialogActions.dismissNewSketchDialog())
        }
    }
}

export const StatedNewSketchDialog = connect(mapStateToPropsForSketch, mapDispatchToPropsForSketch)(NewProjectDialog)

export default NewProjectDialog
