import * as _ from '../../../node_modules/lodash/lodash.min.js'

const initialState = {
    projectIndices: {
        selectedSketch: -1
    },
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
            newNode.ssInfo = {}
        })
    }
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
        case 'PART_INFO_UPDATED':
            const piCopy = Object.assign({}, state)
            const nodeDataCopy = piCopy.sketches[0].model.nodeDataArray
            const currentNode = _.find(nodeDataCopy, n => n.key == action.partKey)
            _.set(currentNode.ssInfo, action.infoKey, action.value)
            return piCopy
        
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