import { combineReducers } from 'redux'
import firebase from './firebase-reducer'
import users from './user-reducer'
import toolbox from './toolbox-reducer'
import parts from './drawing-board-reducer'
import projects from './project-reducer'
import palettes from './palette-reducer'
import notifications from './notification-reducer'
import dialogs from './dialog-reducer'
import errorMessages from './error-message-reducer'
import releaseRate from './explosion/releaserate-reducer'
import feedbacks from './feedback-reducer'
import { connectRouter } from 'connected-react-router';

export default (history) => combineReducers({
    router: connectRouter(history),
    firebase,
    users,
    toolbox,
    parts,
    projects,
    palettes,
    notifications,
    dialogs,
    errorMessages,
    releaseRate,
    feedbacks
})

// // reducers.js
// import { combineReducers } from 'redux'
// import { connectRouter } from 'connected-react-router'

// export default (history) => combineReducers({
//   router: connectRouter(history),
//   ... // rest of your reducers
// })