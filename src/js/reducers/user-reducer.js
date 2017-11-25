const initialState = {}

const users = (state = initialState, action) => {
    switch(action.type) {
        case 'USER_LOGGED_IN': 
            const loggedInState = Object.assign({}, state, { user: action.user })
            return loggedInState
        case 'USER_LOGGED_OUT':
            const loggedOutState = Object.assign({}, state)
            delete loggedOutState.user
            return loggedOutState
        default: 
    }
    return state
}

export default users