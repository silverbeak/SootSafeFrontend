const initialState = {
    projectId: 1,
    sketches: [
        { 
            id: 1, name: 'default', model: { "class": "go.GraphLinksModel",
            "copiesArrays": true,
            "copiesArrayObjects": true,
            "linkFromPortIdProperty": "fid",
            "linkToPortIdProperty": "tid",
            "nodeDataArray": [
                {"key":0, "category":"Comment", "text":"Use Shift to disconnect a shape", "loc":"0 -13"},
                {"key":1, "category":"Comment", "text":"The Context Menu has more commands", "loc":"0 20"},
                {"key":2, "category":"Comment", "text":"Gray Xs are unconnected ports", "loc":"0 -47"},
                {"key":3, "category":"Comment", "text":"Dragged Shapes snap to unconnected ports", "loc":"0 -80"},
                {"key":11, "geo":"F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U2", "spot":"0.25 1 0.25 -0.5"} ], "loc":"-187.33333333333331 -69.33333333333331", "angle":0},
                {"key":12, "angle":90, "geo":"F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U2", "spot":"0.25 1 0.25 -0.5"} ], "loc":"-147.33333333333331 -69.33333333333331"},
                {"key":21, "geo":"F1 M0 0 L60 0 60 20 50 20 Q40 20 40 30 L40 40 20 40 20 30 Q20 20 10 20 L0 20z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U4", "spot":"0 0.25 0.5 0.25"},{"id":"U2", "spot":"0.5 1 0 -0.5"} ], "loc":"-137.33333333333331 -9.333333333333314", "angle":0},
                {"key":5, "geo":"F1 M0 0 L20 0 20 60 0 60z", "ports":[ {"id":"U6", "spot":"0.5 0 0 0.5"},{"id":"U2", "spot":"0.5 1 0 -0.5"} ], "loc":"-197.33333333333331 -19.333333333333314", "angle":0},
                {"key":13, "angle":180, "geo":"F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U2", "spot":"0.25 1 0.25 -0.5"} ], "loc":"-147.33333333333331 30.666666666666685"},
                {"key":14, "angle":270, "geo":"F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U2", "spot":"0.25 1 0.25 -0.5"} ], "loc":"-187.33333333333331 30.666666666666685"},
                {"key":-7, "geo":"F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U2", "spot":"0.25 1 0.25 -0.5"} ], "loc":"-76.66666666666663 -8.666666666666657", "angle":0},
                {"key":-8, "angle":90, "geo":"F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U2", "spot":"0.25 1 0.25 -0.5"} ], "loc":"-36.66666666666663 -8.666666666666657"},
                {"key":-9, "angle":180, "geo":"F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U2", "spot":"0.25 1 0.25 -0.5"} ], "loc":"-36.66666666666663 31.333333333333343"},
                {"key":-10, "angle":270, "geo":"F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z", "ports":[ {"id":"U0", "spot":"1 0.25 -0.5 0.25"},{"id":"U2", "spot":"0.25 1 0.25 -0.5"} ], "loc":"-76.66666666666663 31.333333333333343"}
            ],
            "linkDataArray": [
                {"from":12, "to":11, "fid":"U2", "tid":"U0"},
                {"from":5, "to":11, "fid":"U6", "tid":"U2"},
                {"from":13, "to":21, "fid":"U2", "tid":"U2"},
                {"from":14, "to":5, "fid":"U0", "tid":"U2"},
                {"from":13, "to":14, "fid":"U0", "tid":"U2"},
                {"from":-8, "to":-7, "fid":"U2", "tid":"U0"},
                {"from":-9, "to":-8, "fid":"U2", "tid":"U0"},
                {"from":-10, "to":-7, "fid":"U0", "tid":"U2"},
                {"from":-10, "to":-9, "fid":"U2", "tid":"U0"}
            ]
        }
    }]
}

const projects = (state = initialState, action) => {
    switch(action.type) {
        case 'LOAD_PROJECT_REQUEST':
            return state
        case 'PROJECT_LOADED':
            return state
        case 'SKETCH_UPDATED':
            const updatedCopy = Object.assign({}, state)
            updatedCopy.sketches[action.sketchId].model = action.data
            return updatedCopy
        default:
            return state
    }
}

export default projects