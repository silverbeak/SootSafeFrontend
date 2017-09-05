export const userLoggedIn = user => {
    return {
        type: 'USER_LOGGED_IN',
        user
    }
}

export const userLoggedOut = () => {
    return { type: 'USER_LOGGED_OUT' }
}

export const loginFailed = error => {
    return {
        type: 'LOGIN_FAILED',
        error
    }
}
