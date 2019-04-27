import * as actions from '../actions/action-types'

const errorMessages = (state = {}, action) => {

    switch(action.type) {
        case actions.SHOW_GENERIC_ERROR_MESSAGE:
            return Object.assign({}, state, { title: action.title, errorMessage: action.message.errorMessage, errorCode: action.message.errorCode })

        case actions.CLEAR_ALL_ERROR_MESSAGES:
            return {}

        default:
    }

    return state
}

export default errorMessages