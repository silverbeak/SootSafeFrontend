import { fbApp } from '../firebase/firebase'
import { push } from 'react-router-redux'

export const userLoggedIn = (user, path = '/') => {
    return dispatch => {

        path = path === '/login' ? '/' : path
        dispatch(push(path))
        dispatch({ type: 'USER_LOGGED_IN', user })
    }
}

export const userLogoutRequested = () => {
    return dispatch => {
        fbApp.auth().signOut()
        return { type: 'USER_LOGOUT_REQUEST_SENT' }
    }
}

export const emailAndPasswordLoginAttempt = (name, password) => {
    return dispatch => {
        fbApp.auth().signInWithEmailAndPassword(name, password).catch(e => {
            console.error('Could not login user', name)
        })

        return { type: 'USER_LOGIN_ATTEMPT_SENT' }
    }
}

export const userLoggedOut = () => {
    return dispatch => { 
        dispatch(push('/'))
        dispatch({type: 'USER_LOGGED_OUT' })
    }
}

export const loginFailed = error => {
    return {
        type: 'LOGIN_FAILED',
        error
    }
}
