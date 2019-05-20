import * as _ from '../../../node_modules/lodash/lodash.min.js'
import { paletteData } from './constants/palette-data.js';

const initialPalette = [
    {
        id: 1, name: 'default', 
        data: paletteData
    }
]

const palettes = function (state = initialPalette, action) {
    switch (action.type) {
        // case 'PALETTE_REQUESTED':
        // TODO: Return palette based on action.id
        // return state
        default:
            if (state[0]) {
                const copy = _.merge({}, state)
                // const merged = defaultMerge(state[0].data)
                // copy[0].data = merged
                return copy
            } else {
                return state
            }
    }
}

export default palettes
