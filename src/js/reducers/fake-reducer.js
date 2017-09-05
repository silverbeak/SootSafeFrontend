const initialState = {
    fake: {
        value: 'Initial fake'
    }
}

const fakeReducer = function(state = initialState, action) {
    const newState = Object.assign({}, state, { fake: action.fake })
    return newState
}

export default fakeReducer