import { fbApp, db, storage } from '../firebase/firebase'
import * as _ from '../../../node_modules/lodash/lodash.min.js'

const initialState = { fbApp, db, storage }

const firebaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_PROJECT':
            const baseData = extractPath(action.projectData)

            const ref = db.collection('projects').doc('myProject2')

            ref.set(baseData)

            _.forEach(action.projectData.linkDataArray, link => {
                ref.collection('linkDataArray').doc(`${link.key}`).set(link)
            })

            _.forEach(action.projectData.nodeDataArray, node => {
                ref.collection('nodeDataArray').doc(`${node.key}`).set(node)
            })
            break

        case 'RELEASE_RATE_CALCULATION_SUBMITTED':
            break

        case 'RELEASE_RATE_CALCULATION_RESULT_RECEIVED':
            console.log('Release rate submission successful', action)
            break

        default:
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
