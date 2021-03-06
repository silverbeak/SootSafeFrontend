import { fbApp } from '../firebase/firebase'
import { loadProjectIndices } from './firebase-fid-actions'
import { loadUserDetails, loadCompaniesForUser } from './firebase-actions'
import { push } from 'connected-react-router'

export const userLoggedIn = (user, path = '/') => {
    return dispatch => {

        path = path === '/login' ? '/' : path
        dispatch(push(path))
        dispatch({ type: 'USER_LOGGED_IN', user })
        dispatch(loadProjectIndices())
        dispatch(loadUserDetails(user))
        dispatch(loadCompaniesForUser(user))
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
        dispatch({type: 'USER_LOGGED_OUT' })
        dispatch(push('/'))
    }
}

export const loginFailed = error => {
    return {
        type: 'LOGIN_FAILED',
        error
    }
}
