const initialState = {
    selectedPart: {}
}

const parts = (state = initialState, action) => {
    switch(action.type) {
        case 'PART_SELECTED':
            return Object.assign({}, state, { selectedPart: action.part })
        case 'PART_INFO_UPDATED':
            const currentlySelectedPartCopy = Object.assign({}, state.selectedPart)
            currentlySelectedPartCopy[action.key] = action.value
            return Object.assign({}, state, { selectedPart: currentlySelectedPartCopy })
    }
    return state
}

export default parts