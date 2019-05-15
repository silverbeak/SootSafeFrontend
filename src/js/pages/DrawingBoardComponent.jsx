import { connect } from 'react-redux'
import DrawingBoard from './drawing-board'
import * as actions from '../actions/drawing-board-actions'
import * as projectActions from '../actions/project-actions'
import * as backendActions from '../actions/firebase-fid-actions'

import * as _ from 'lodash/lodash.min'

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