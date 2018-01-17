import * as _ from '../../../node_modules/lodash/lodash.min.js'
import { changeTypeByName, AVAILABLE_TYPES } from './component-field-index'

const initialState = {
    projectIndices: { },
    sketches: {}
}

const addSootSafeInfoToNodeByKey = (key, nodeDataArray) => {
    const node = _.find(nodeDataArray, n => n.key === key)
    node.ssInfo = {}
}

const handleInserts = (nodeKeys, modifiedNodeData, nodeDataArray) => {
    if (nodeKeys) {
        nodeKeys.forEach(key => {
            const newNode = _.find(nodeDataArray, n => n.key === key)
            if (newNode) {
                newNode.fields = _.merge({}, newNode.fields)
                newNode.type = _.merge({}, newNode.type)
                newNode.ssInfo = {}
            } else {
                console.warn('No matching node found. This will happen once for new sketches. Disregard warning.')
            }
        })
    }
}

const partTypeChanged = (state, action) => {
    const stateCopy = Object.assign({}, state)
    const targetSketch = stateCopy.sketches[action.sketchId]
    const nodePartsCopy = targetSketch.model.nodeDataArray
    const nodeIndex = _.findIndex(nodePartsCopy, n => n.key == action.partKey)
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
    const currentNode = _.find(nodeDataCopy, n => n.key == action.entry.key)
    _.set(currentNode, 'calculationResult', action.entry)
    return stateCopy
}

const projects = (state = initialState, action) => {
    switch(action.type) {
        case 'LOAD_PROJECT_REQUEST':
        return state
        
        case 'SKETCH_DATA_LOADED':
            const projectStateCopy = Object.assign({}, state)
            projectStateCopy.sketches[action.sketchId] = action.sketchData
            return projectStateCopy
        
        case 'PROJECT_LOADED':
            return state
        // case 'PART_DROPPED':
        //     const updatedCopy = Object.assign({}, state)
        //     action.partKeys.each(key => addSootSafeInfoToNodeByKey(key, action.data.nodeDataArray))
        //     updatedCopy.sketches[action.sketchId].model = action.data
        //     return updatedCopy
        case 'PART_TYPE_CHANGED': return partTypeChanged(state, action)

        case 'PART_INFO_UPDATED':
            const piCopy = Object.assign({}, state)
            const nodeDataCopy = piCopy.sketches[action.sketchId].model.nodeDataArray
            const currentNode = _.find(nodeDataCopy, n => n.key == action.partKey)
            _.set(currentNode, `${action.infoKey}.value`, action.value)
            return piCopy

        case 'PRESSURE_CALCULATION_ENTRY_RESULT': return pressureCalculationResult(state, action)

        case 'PRESSURE_CALCULATION_ERROR_RECEIVED': return pressureCalculationError(state, action)
        
        case 'MODEL_UPDATED':
            if (state.sketches[action.sketchId]) {
                const incrementalJson = JSON.parse(action.incrementalUpdateJson)
                const incrementalUpdateState = Object.assign({}, state)
                handleInserts(incrementalJson.insertedNodeKeys, incrementalJson.modifiedNodeData, incrementalUpdateState.sketches[action.sketchId].model.nodeDataArray)
                return incrementalUpdateState
            } else {
                return state
            }
        
        case 'PROJECT_SAVED': 
            console.log('Project has been saved locally')
            return state
        
        case 'PROJECT_INDICES_LOADED':
            return Object.assign({}, state, { projectIndices: action.projectIndices })

        default:
            return state
    }
}

export default projects