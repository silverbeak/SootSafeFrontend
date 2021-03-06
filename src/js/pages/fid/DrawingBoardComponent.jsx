import { connect } from 'react-redux'
import DrawingBoard from './DrawingBoard'
import * as actions from '../../actions/drawing-board-actions'
import * as projectActions from '../../actions/project-actions'

import * as _ from 'lodash/lodash.min'

const mapStateToProps = state => {
    return {
        selectedPart: state.parts.selectedPart,
        palette: state.palettes[0].data,
    }
}

const onSelectionChanged = (part, sketchId) => {
    return (dispatch, getState) => {
        if (!part.diagram) return

        if (part.diagram.selection.count > 1) {
            // props.partSelected({ info: 'More than one part selected' })
            return
        }
        if (part.diagram.selection.count < 1) {
            // props.partSelected({ info: 'No parts selected' })
            return
        }
        if (part.key) {
            const sketch = getState().projects.sketches[sketchId]
            const partFromModel = _.find(sketch.model.nodeDataArray, n => n.key === part.key)
            // props.partSelected(partFromModel ? partFromModel : {})
            dispatch(actions.partSelected(partFromModel))
        } else {
            console.log('Illegal select', part)
        }
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        partSelected: part => {
            dispatch(onSelectionChanged(part, ownProps.sketchId))
        },
        modelUpdated: updateEvent => {
            switch(updateEvent.eventType) {
                case 'Add':
                    if (updateEvent.nodeData) {
                        // We get two events when dropping a new node. One contains the node data, the other linkData
                        // In this part, we're only interested in the dropped part, since that updates the selectedPart props
                        dispatch(projectActions.modelUpdated(updateEvent.model, ownProps.sketchId, updateEvent.nodeData))
                    } else {
                        dispatch(projectActions.modelUpdated(updateEvent.model, ownProps.sketchId))
                    }                    
                    break
                case 'Remove':
                    dispatch(projectActions.modelUpdated(updateEvent.model, ownProps.sketchId))
                    break
                default:
                    dispatch(projectActions.modelUpdated(updateEvent.model, ownProps.sketchId))
                    break
            }
        },
    }
}

const StatedDrawingBoard = connect(mapStateToProps, mapDispatchToProps)(DrawingBoard)

export default StatedDrawingBoard