const initialState = {}

const users = (state = initialState, action) => {
    switch(action.type) {
        case 'USER_LOGGED_IN': 
            const loggedInState = Object.assign({}, state, { user: action.user })
            return loggedInState
        case 'USER_LOGGED_OUT':
            const loggedOutState = Object.assign({}, state, { user: null })
            return loggedOutState
        default: 
            console.log('Unknown action type', action.type)
    }
    return state
}

export default users