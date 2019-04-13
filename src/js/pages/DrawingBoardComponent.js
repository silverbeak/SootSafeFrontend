import { connect } from 'react-redux'
import DrawingBoard from './drawing-board'
import * as actions from '../actions/drawing-board-actions'
import * as projectActions from '../actions/project-actions'
import * as backendActions from '../actions/firebase-fid-actions'

class DrawingBoardComp extends DrawingBoard {
    constructor(props) {
        super(props)
    }
    componentWillReceiveProps(props) {
        // When a new project/sketch has been requested, we should fetch the data from the backend
        // TODO: Should probably reset selected parts and do a few more things to the DrawingBoard        
        if (props.sketchId !== this.props.sketchId) {
            this.props.requestProjectLoad(props.projectId, props.sketchId)
            props.partSelected({})
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        sketchId: ownProps.sketchId,
        projectId: ownProps.projectId,
        selectedPart: state.parts.selectedPart,
        palette: state.palettes[0].data,
        sketch: state.projects.sketches[ownProps.sketchId]
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
        modelUpdated: (updateEvent) => {
            switch(updateEvent.eventType) {
                case 'Add':
                    dispatch(projectActions.modelUpdated(updateEvent.model, ownProps.match.params.sketchId))
                    break
                case 'Remove':
                    dispatch(projectActions.modelUpdated(updateEvent.model, ownProps.match.params.sketchId))
                    break
                default:
                    dispatch(projectActions.modelUpdated(updateEvent.model, ownProps.match.params.sketchId))
                    break
            }
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

const StatedDrawingBoard = connect(mapStateToProps, mapDispatchToProps)(DrawingBoardComp)

export default StatedDrawingBoard