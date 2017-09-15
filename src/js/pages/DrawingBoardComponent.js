import { connect } from 'react-redux'
import DrawingBoard from './drawing-board'
import * as actions from '../actions/drawing-board-actions'
import * as projectActions from '../actions/project-actions'

const mapStateToProps = state => {
    return {
        selectedPart: state.parts.selectedPart,
        palette: state.palettes[0].data,
        model: state.projects.sketches[0].model
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
        }
    }
}

const StatedDrawingBoard = connect(mapStateToProps, mapDispatchToProps)(DrawingBoard)

export default StatedDrawingBoard