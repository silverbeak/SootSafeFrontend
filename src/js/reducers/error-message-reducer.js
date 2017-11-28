const errorMessages = (state = {}, action) => {

    switch(action.type) {
        case 'SHOW_GENERIC_ERROR_MESSAGE':
            return Object.assign({}, state, { title: action.title, errorMessage: action.message.errorMessage, errorCode: action.message.errorCode })

        case 'CLEAR_ALL_ERROR_MESSAGES':
            return {}
    }

    return state
}

export default errorMessages