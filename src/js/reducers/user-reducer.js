import { USER_DETAILS_FETCHED } from "../actions/firebase-actions";

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

        case USER_DETAILS_FETCHED:
            return Object.assign({}, state, { userDetails: action.userDetails })
        default: 
    }
    return state
}

export default users