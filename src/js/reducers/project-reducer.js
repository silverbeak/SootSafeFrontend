import * as _ from '../../../node_modules/lodash/lodash.min.js'
import { changeTypeByName, AVAILABLE_TYPES } from './component-field-index'
import * as actions from '../actions/action-types'

const initialState = {
    projectIndices: { },
    sketches: {}
}

// const addSootSafeInfoToNodeByKey = (key, nodeDataArray) => {
//     const node = _.find(nodeDataArray, n => n.key === key)
//     node.ssInfo = {}
// }

const partTypeChanged = (state, action) => {
    const stateCopy = _.merge({}, state)
    const targetSketch = stateCopy.sketches[action.sketchId]
    const nodePartsCopy = targetSketch.model.nodeDataArray
    const nodeIndex = _.findIndex(nodePartsCopy, n => n.key === action.partKey)
    _.set(nodePartsCopy[nodeIndex], action.infoKey, AVAILABLE_TYPES[action.value])
    nodePartsCopy[nodeIndex] = changeTypeByName(nodePartsCopy[nodeIndex])
    return stateCopy
}

const pressureCalculationError = (state, action) => {
    // TODO: May handle errors for individual nodes here in the future
    return state
}

const pressureCalculationResult = (state, action) => {
    const stateCopy = Object.assign({}, state)
    const nodeDataCopy = stateCopy.sketches[action.sketchId].model.nodeDataArray
    const currentNode = _.find(nodeDataCopy, n => n.key === action.entry.key)
    _.set(currentNode, 'calculationResult', action.entry)
    return stateCopy
}

const projects = (state = initialState, action) => {
    switch(action.type) {
        case actions.LOAD_PROJECT_REQUEST:
            return state
        
        case actions.SKETCH_DATA_LOADED:
            const projectStateCopy = Object.assign({}, state)
            projectStateCopy.sketches[action.sketchId] = action.sketchData
            return projectStateCopy
        
        case actions.PROJECT_LOADED:
            return state
        case actions.PART_TYPE_CHANGED: return partTypeChanged(state, action)

        case actions.PART_INFO_UPDATED:
            const piCopy = Object.assign({}, state)
            const nodeDataCopy = piCopy.sketches[action.sketchId].model.nodeDataArray
            const currentNode = _.find(nodeDataCopy, n => n.key === action.partKey)
            _.set(currentNode, `${action.infoKey}.value`, action.value)
            return piCopy

        case actions.PRESSURE_CALCULATION_ENTRY_RESULT: return pressureCalculationResult(state, action)

        case actions.PRESSURE_CALCULATION_ERROR_RECEIVED: return pressureCalculationError(state, action)
        
        case actions.MODEL_UPDATED:
            if (state.sketches[action.sketchId]) {
                const incrementalUpdateState = _.merge({}, state)
                
                if (action.droppedNodeData) {
                    // Some tricks here:
                    // If this is a new part, we need to merge the info from the incrementalUpdateJson (which contains the new key etc)
                    // with the action.droppedNodeData, which is enriched with the value fields.
                    // I'm not necessarily happy with this, but I don't know where I want the fields to be added...
                    const droppedNodeIndex = _.findIndex(action.incrementalUpdateJson.nodeDataArray, n => n.key === action.droppedNodeData.key)
                    const droppedNode = action.incrementalUpdateJson.nodeDataArray[droppedNodeIndex]
                    action.incrementalUpdateJson.nodeDataArray[droppedNodeIndex] = _.assign({}, action.droppedNodeData, droppedNode)
                }

                incrementalUpdateState.sketches[action.sketchId].model = action.incrementalUpdateJson
                return incrementalUpdateState
            } else {
                return state
            }
        
        case actions.PROJECT_SAVED: 
            console.log('Project has been saved locally')
            return state
        
        case actions.PROJECT_INDICES_LOADED:
            return Object.assign({}, state, { projectIndices: action.projectIndices })

        case actions.SKETCH_METADATA_LOADED:
            const smlStateCopy = _.merge({}, state)
            _.each(action.sketchMetadata, md => {
                const proj = _.find(smlStateCopy.projectIndices, p => p.name === md.projectId)
                if (!proj.sketches) proj.sketches = []
                proj.sketches.push(md.sketchMetadata)
            })
            return smlStateCopy

        case actions.SKETCH_DATA_UPDATED:
                const sduStateCopy = _.merge({}, state)
                const sduSketchDataCopy = sduStateCopy.sketches[action.sketchId].model.sketchData
                _.set(sduSketchDataCopy, `${action.fieldPath}.value`, action.value)
                return sduStateCopy

        default:
            return state
    }
}

export default projects