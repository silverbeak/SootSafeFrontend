import * as _ from '../../../node_modules/lodash/lodash.min.js'

const initialState = {
  projectId: 1,
  sketches: [
      { 
          id: 1, name: 'default', model: { "class": "go.GraphLinksModel",
          "copiesArrays": true,
          "copiesArrayObjects": true,
          "linkFromPortIdProperty": "fid",
          "linkToPortIdProperty": "tid",
          "linkKeyProperty": "key",
          "nodeDataArray": [
              {"key":14, "angle":270, "ssInfo": {"nodeType": "angle"}, "geo":"F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U2", "spot":"0.25 1 0.25 -0.5"} ], "loc":"-127.33333333333326 -27.999999999999957"},
              {"key":-7, "angle":90, "ssInfo": {"nodeType": "fireCell"}, "geo":"F1 M0 0 L20 0 20 20 0 20z", "ports":[ {"id":"U6", "spot":"0.5 0 0 0.5"},{"id":"U2", "spot":"0.5 1 0 -0.5"} ], "loc":"-97.33333333333323 -17.99999999999993"},
              {"key":1, "ssInfo": {"nodeType": "outlet"}, "geo":"F1 M0 0 L20 0 20 20 0 20z", "ports":[ {"id":"U6", "spot":"0.5 0 0 0.5"},{"id":"U2", "spot":"0.5 1 0 -0.5"} ], "fill":"rgba(128, 0, 128, 0.5)", "loc":"-137.33333333333326 -57.99999999999997"}
          ],
          "linkDataArray": [ 
              {"key": -13, "from":-7, "to":14, "fid":"U2", "tid":"U2"},
              {"key": -12, "from":1, "to":14, "fid":"U2", "tid":"U0"}
          ]
        }
      }]
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
            projectStateCopy.sketches[action.sketchId].model = action.sketchData
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
            const incrementalJson = JSON.parse(action.incrementalUpdateJson)
            const incrementalUpdateState = Object.assign({}, state)
            handleInserts(incrementalJson.insertedNodeKeys, incrementalJson.modifiedNodeData, incrementalUpdateState.sketches[action.sketchId].model.nodeDataArray)
            return incrementalUpdateState

        case 'PROJECT_SAVED': 
            console.log('Project has been saved locally')
            return state
        default:
            return state
    }
}

export default projects