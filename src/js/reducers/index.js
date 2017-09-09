import { combineReducers } from 'redux'
import firebase from './firebase-reducer'
import users from './user-reducer'
import toolbox from './toolbox-reducer'
import parts from './drawing-board-reducer'

export default combineReducers({
    firebase,
    users,
    toolbox,
    parts
})
