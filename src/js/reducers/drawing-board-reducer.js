import * as actions from '../actions/action-types'

const initialState = {
    selectedPart: {}
}

const parts = (state = initialState, action) => {
    switch(action.type) {
        case actions.PART_SELECTED:
            return Object.assign({}, state, { selectedPart: action.part })
        case actions.PART_INFO_UPDATED:
            const currentlySelectedPartCopy = Object.assign({}, state.selectedPart)
            currentlySelectedPartCopy[action.key] = action.value
            return Object.assign({}, state, { selectedPart: currentlySelectedPartCopy })
        default:
            return state
    }
}

export default parts