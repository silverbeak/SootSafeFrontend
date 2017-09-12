import { connect } from 'react-redux'
import DrawingBoard from './drawing-board'
import * as actions from '../actions/drawing-board-actions'
import * as projectActions from '../actions/project-actions'

const mapStateToProps = state => {
    return {
        selectedPart: state.parts.selectedPart,
        palette: state.palettes[0].data,
        projectData: state.projects
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        partSelected: part => {
            dispatch(actions.partSelected(part))
        },
        sketchUpdated: (data, sketchId) => {
            dispatch(projectActions.sketchUpdated(data, sketchId))
        }
    }
}

const StatedDrawingBoard = connect(mapStateToProps, mapDispatchToProps)(DrawingBoard)

export default StatedDrawingBoard