import { combineReducers } from 'redux'
import firebase from './firebase-reducer'
import users from './user-reducer'
import fakeReducer from './fake-reducer'
import parts from './drawing-board-reducer'

export default combineReducers({
    firebase,
    users,
    fakeReducer,
    parts
})
