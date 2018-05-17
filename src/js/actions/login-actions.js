import { fbApp } from '../firebase/firebase'
import { loadProjectIndices } from './firebase-fid-actions'
import { push } from 'react-router-redux'

export const userLoggedIn = (user, path = '/') => {
    return dispatch => {

        path = path === '/login' ? '/' : path
        dispatch(push(path))
        dispatch({ type: 'USER_LOGGED_IN', user })
        dispatch(loadProjectIndices())
    }
}

export const userLogoutRequested = () => {
    return dispatch => {
        fbApp.auth().signOut()
        return { type: 'USER_LOGOUT_REQUEST_SENT' }
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
