import { connect } from 'react-redux'
import DrawingBoard from './drawing-board'
import * as actions from '../actions/drawing-board-actions'
import * as databaseActions from '../actions/firebase-actions'
import * as projectActions from '../actions/project-actions'
import * as backendActions from '../actions/firebase-fid-actions'

const mapStateToProps = (state, ownProps) => {
    return {
        sketchId: ownProps.match.params.sketchId,
        projectId: ownProps.match.params.projectId,
        selectedPart: state.parts.selectedPart,
        palette: state.palettes[0].data,
        projects: state.projects,
        sketches: state.projects.sketches,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        partSelected: part => {
            dispatch(actions.partSelected(part))
        },
        partDropped: (data, partKeys, sketchId) => {
            dispatch(projectActions.partDropped(data, partKeys, sketchId))
        },
        modelUpdated: (incrementalUpdateJson, sketchId) => {
            dispatch(projectActions.modelUpdated(incrementalUpdateJson, sketchId))
        },
        projectSaved: (projectData, projectId, sketchId) => {
            // dispatch(databaseActions.saveProjectToDb(projectData))
            dispatch(backendActions.saveToBackend(projectData, projectId, sketchId))
            dispatch(backendActions.calculatePressureLoss(projectData, projectId, sketchId))
        },
        requestProjectLoad: (projectId, sketchId) => {
            dispatch(backendActions.loadFromBackend(projectId, sketchId))
        },
    }
}

const StatedDrawingBoard = connect(mapStateToProps, mapDispatchToProps)(DrawingBoard)

export default StatedDrawingBoard