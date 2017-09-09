import { connect } from 'react-redux'
import DrawingBoard from './drawing-board'
import * as actions from '../actions/drawing-board-actions'

const mapStateToProps = state => {
    return {
        selectedPart: state.parts.selectedPart,
        palette: state.palettes[0].data
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        partSelected: part => {
            dispatch(actions.partSelected(part))
        }
    }
}

const StatedDrawingBoard = connect(mapStateToProps, mapDispatchToProps)(DrawingBoard)

export default StatedDrawingBoard