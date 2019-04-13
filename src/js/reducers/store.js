import reducer from './'
import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createBrowserHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

export const Store = createStore(reducer, applyMiddleware(middleware, ReduxThunk))
