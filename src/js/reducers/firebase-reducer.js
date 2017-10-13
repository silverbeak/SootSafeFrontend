import {fbApp, db} from '../firebase/firebase'
import * as _ from '../../../node_modules/lodash/lodash.min.js'

const initialState = { fbApp, db }

const firebaseReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SAVE_PROJECT':
        // action.projectData = bla
        const baseData = extractPath(action.projectData)
        
        const ref = db.collection('projects').doc('myProject2')

        ref.set(baseData)

        _.forEach(action.projectData.linkDataArray, link => {
            ref.collection('linkDataArray').doc(`${link.key}`).set(link)
        })

        _.forEach(action.projectData.nodeDataArray, node => {
            ref.collection('nodeDataArray').doc(`${node.key}`).set(node)
        })

        // ref.collection('linkDataArray').add(linkDataArray)
        // ref.collection('nodeDataArray').add(nodeDataArray)
    }
    return initialState
}

export default firebaseReducer


const extractPath = obj => {
    const nonObjects = _.reduce(obj, (aggregator, value, key) => {
        return typeof value !== 'object' ? 
            Object.assign({}, aggregator, { [key]: value }) : 
            aggregator
    }, {})

    return nonObjects
}

const bla = {
    "class": "go.GraphLinksModel",
    "copiesArrays": true,
    "copiesArrayObjects": true,
    "linkKeyProperty": "key",
    "linkFromPortIdProperty": "fid",
    "linkToPortIdProperty": "tid",
    "nodeDataArray": [
      {
        "key": 1,
        "ssInfo": {
          "nodeType": "outlet"
        },
        "geo": "F1 M0 0 L20 0 20 20 0 20z",
        "ports": [
          {
            "id": "U6",
            "spot": "0.5 0 0 0.5"
          },
          {
            "id": "U2",
            "spot": "0.5 1 0 -0.5"
          }
        ],
        "fill": "rgba(128, 0, 128, 0.5)",
        "loc": "-137.3333333333332 -77.99999999999999"
      },
      {
        "key": 4,
        "angle": 90,
        "geo": "F1 M0 0 L60 0 60 20 50 20 Q40 20 40 30 L40 40 20 40 20 30 Q20 20 10 20 L0 20z",
        "ports": [
          {
            "id": "U0",
            "spot": "1 0.25 -0.5 0.25"
          },
          {
            "id": "U4",
            "spot": "0 0.25 0.5 0.25"
          },
          {
            "id": "U2",
            "spot": "0.5 1 0 -0.5"
          }
        ],
        "loc": "-147.3333333333332 -17.999999999999986",
        "ssInfo": {
          "nodeType": "t-pipe",
          "capacity": 17,
          "dimension": {
            "diameter": 125
          }
        }
      },
      {
        "key": 7,
        "angle": 90,
        "geo": "F1 M0 0 L60 0 60 20 50 20 Q40 20 40 30 L40 40 20 40 20 30 Q20 20 10 20 L0 20z",
        "ports": [
          {
            "id": "U0",
            "spot": "1 0.25 -0.5 0.25"
          },
          {
            "id": "U4",
            "spot": "0 0.25 0.5 0.25"
          },
          {
            "id": "U2",
            "spot": "0.5 1 0 -0.5"
          }
        ],
        "loc": "-147.3333333333332 -17.999999999999986",
        "ssInfo": {
          "nodeType": "t-pipe",
          "capacity": 51,
          "dimension": {
            "diameter": 160
          }
        }
      },
      {
        "key": 6,
        "geo": "F1 M0 0 L20 0 20 20 0 20z",
        "ports": [
          {
            "id": "U6",
            "spot": "0.5 0 0 0.5"
          },
          {
            "id": "U2",
            "spot": "0.5 1 0 -0.5"
          }
        ],
        "fill": "rgba(128, 0, 128, 0.5)",
        "loc": "-137.3333333333332 22.000000000000014",
        "ssInfo": {
          "nodeType": "areaIncrement",
          "capacity": 34,
          "dimension": {
            "diameter": 160
          }
        }
      },
      {
        "key": 13,
        "geo": "F1 M0 0 L20 0 20 20 0 20z",
        "ports": [
          {
            "id": "U6",
            "spot": "0.5 0 0 0.5"
          },
          {
            "id": "U2",
            "spot": "0.5 1 0 -0.5"
          }
        ],
        "fill": "rgba(128, 0, 128, 0.5)",
        "loc": "-137.3333333333332 22.000000000000014",
        "ssInfo": {
          "nodeType": "areaIncrement",
          "capacity": 68,
          "dimension": {
            "diameter": 200
          }
        }
      },
      {
        "key": 3,
        "geo": "F1 M0 0 L20 0 20 20 0 20z",
        "ports": [
          {
            "id": "U6",
            "spot": "0.5 0 0 0.5"
          },
          {
            "id": "U2",
            "spot": "0.5 1 0 -0.5"
          }
        ],
        "fill": "rgba(128, 0, 128, 0.5)",
        "loc": "-137.3333333333332 42.000000000000014",
        "ssInfo": {
          "nodeType": "pipe",
          "dimension": {
            "diameter": 125,
            "length": 2700
          },
          "capacity": 17
        }
      },
      {
        "key": 5,
        "geo": "F1 M0 0 L20 0 20 20 0 20z",
        "ports": [
          {
            "id": "U6",
            "spot": "0.5 0 0 0.5"
          },
          {
            "id": "U2",
            "spot": "0.5 1 0 -0.5"
          }
        ],
        "fill": "rgba(128, 0, 128, 0.5)",
        "loc": "-137.3333333333332 42.000000000000014",
        "ssInfo": {
          "nodeType": "pipe",
          "dimension": {
            "diameter": 125,
            "length": 2700
          },
          "capacity": 34
        }
      },
      {
        "key": 2,
        "geo": "F1 M0 0 L20 0 20 20 0 20z",
        "ports": [
          {
            "id": "U6",
            "spot": "0.5 0 0 0.5"
          },
          {
            "id": "U2",
            "spot": "0.5 1 0 -0.5"
          }
        ],
        "fill": "rgba(128, 0, 128, 0.5)",
        "loc": "-137.3333333333332 62.000000000000014",
        "ssInfo": {
          "nodeType": "fireCell",
          "targetCell": true
        }
      },
      {
        "key": 17,
        "geo": "F1 M0 0 L20 0 20 20 0 20z",
        "ports": [
          {
            "id": "U6",
            "spot": "0.5 0 0 0.5"
          },
          {
            "id": "U2",
            "spot": "0.5 1 0 -0.5"
          }
        ],
        "fill": "rgba(128, 0, 128, 0.5)",
        "loc": "-137.3333333333332 62.000000000000014",
        "ssInfo": {
          "capacity": 624,
          "nodeType": "box"
        }
      },
      {
        "key": 8,
        "geo": "F1 M0 0 L20 0 20 20 0 20z",
        "ports": [
          {
            "id": "U6",
            "spot": "0.5 0 0 0.5"
          },
          {
            "id": "U2",
            "spot": "0.5 1 0 -0.5"
          }
        ],
        "fill": "rgba(128, 0, 128, 0.5)",
        "loc": "-137.3333333333332 -57.999999999999986",
        "ssInfo": {
          "nodeType": "pipe",
          "capacity": 51,
          "dimension": {
            "diameter": 160,
            "length": 2700
          }
        }
      },
      {
        "key": 15,
        "geo": "F1 M0 0 L20 0 20 20 0 20z",
        "ports": [
          {
            "id": "U6",
            "spot": "0.5 0 0 0.5"
          },
          {
            "id": "U2",
            "spot": "0.5 1 0 -0.5"
          }
        ],
        "fill": "rgba(128, 0, 128, 0.5)",
        "loc": "-137.3333333333332 -57.999999999999986",
        "ssInfo": {
          "nodeType": "pipe",
          "capacity": 156,
          "dimension": {
            "diameter": 200,
            "length": 6000
          }
        }
      },
      {
        "key": 9,
        "geo": "F1 M0 0 L20 0 20 20 0 20z",
        "ports": [
          {
            "id": "U6",
            "spot": "0.5 0 0 0.5"
          },
          {
            "id": "U2",
            "spot": "0.5 1 0 -0.5"
          }
        ],
        "fill": "rgba(128, 0, 128, 0.5)",
        "loc": "-137.3333333333332 -57.999999999999986",
        "ssInfo": {
          "nodeType": "t-pipe",
          "capacity": 68,
          "dimension": {
            "diameter": 160
          }
        }
      },
      {
        "key": 14,
        "geo": "F1 M0 0 L20 0 20 20 0 20z",
        "ports": [
          {
            "id": "U6",
            "spot": "0.5 0 0 0.5"
          },
          {
            "id": "U2",
            "spot": "0.5 1 0 -0.5"
          }
        ],
        "fill": "rgba(128, 0, 128, 0.5)",
        "loc": "-137.3333333333332 -57.999999999999986",
        "ssInfo": {
          "nodeType": "t-pipe",
          "capacity": 156,
          "dimension": {
            "diameter": 200
          }
        }
      },
      {
        "key": 11,
        "geo": "F1 M0 0 L20 0 20 20 0 20z",
        "ports": [
          {
            "id": "U6",
            "spot": "0.5 0 0 0.5"
          },
          {
            "id": "U2",
            "spot": "0.5 1 0 -0.5"
          }
        ],
        "fill": "rgba(128, 0, 128, 0.5)",
        "loc": "-137.3333333333332 -57.999999999999986",
        "ssInfo": {
          "nodeType": "bend",
          "capacity": 68,
          "dimension": {
            "diameter": 160,
            "angle": 90
          }
        }
      },
      {
        "key": 12,
        "geo": "F1 M0 0 L20 0 20 20 0 20z",
        "ports": [
          {
            "id": "U6",
            "spot": "0.5 0 0 0.5"
          },
          {
            "id": "U2",
            "spot": "0.5 1 0 -0.5"
          }
        ],
        "fill": "rgba(128, 0, 128, 0.5)",
        "loc": "-137.3333333333332 -57.999999999999986",
        "ssInfo": {
          "nodeType": "bend",
          "capacity": 68,
          "dimension": {
            "diameter": 160,
            "angle": 90
          }
        }
      },
      {
        "key": 16,
        "geo": "F1 M0 0 L20 0 20 20 0 20z",
        "ports": [
          {
            "id": "U6",
            "spot": "0.5 0 0 0.5"
          },
          {
            "id": "U2",
            "spot": "0.5 1 0 -0.5"
          }
        ],
        "fill": "rgba(128, 0, 128, 0.5)",
        "loc": "-137.3333333333332 -57.999999999999986",
        "ssInfo": {
          "nodeType": "bend",
          "capacity": 156,
          "dimension": {
            "diameter": 200,
            "angle": 90
          }
        }
      },
      {
        "key": 10,
        "geo": "F1 M0 0 L20 0 20 20 0 20z",
        "ports": [
          {
            "id": "U6",
            "spot": "0.5 0 0 0.5"
          },
          {
            "id": "U2",
            "spot": "0.5 1 0 -0.5"
          }
        ],
        "fill": "rgba(128, 0, 128, 0.5)",
        "loc": "-137.3333333333332 -57.999999999999986",
        "ssInfo": {
          "nodeType": "pipe",
          "capacity": 68,
          "dimension": {
            "diameter": 160,
            "length": 4000
          }
        }
      }
    ],
    "linkDataArray": [
      {
        "from": 6,
        "to": 7,
        "fid": "U6",
        "tid": "U0",
        "key": -2
      },
      {
        "from": 5,
        "to": 6,
        "fid": "U6",
        "tid": "U2",
        "key": 6
      },
      {
        "from": 2,
        "to": 3,
        "fid": "U6",
        "tid": "U2",
        "key": 5
      },
      {
        "from": 3,
        "to": 4,
        "fid": "U6",
        "tid": "U2",
        "key": 3
      },
      {
        "from": 4,
        "to": 5,
        "fid": "U6",
        "tid": "U2",
        "key": 4
      },
      {
        "from": 17,
        "to": 1,
        "fid": "U6",
        "tid": "U2",
        "key": 2
      },
      {
        "from": 16,
        "to": 17,
        "fid": "U6",
        "tid": "U2",
        "key": 17
      },
      {
        "from": 15,
        "to": 16,
        "fid": "U6",
        "tid": "U2",
        "key": 16
      },
      {
        "from": 14,
        "to": 15,
        "fid": "U6",
        "tid": "U2",
        "key": 15
      },
      {
        "from": 13,
        "to": 14,
        "fid": "U6",
        "tid": "U2",
        "key": 14
      },
      {
        "from": 12,
        "to": 13,
        "fid": "U6",
        "tid": "U2",
        "key": 13
      },
      {
        "from": 11,
        "to": 12,
        "fid": "U6",
        "tid": "U2",
        "key": 12
      },
      {
        "from": 10,
        "to": 11,
        "fid": "U6",
        "tid": "U2",
        "key": 11
      },
      {
        "from": 8,
        "to": 9,
        "fid": "U6",
        "tid": "U2",
        "key": -9
      },
      {
        "from": 8,
        "to": 7,
        "fid": "U2",
        "tid": "U4",
        "key": 8
      },
      {
        "from": 9,
        "to": 10,
        "fid": "U2",
        "tid": "U4",
        "key": 10
      }
    ]
  }