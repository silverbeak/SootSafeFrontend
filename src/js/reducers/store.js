import reducer from './'
import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createBrowserHistory()

export const Store = createStore(
    reducer(history),
    compose(
        applyMiddleware(
            routerMiddleware(history),
            ReduxThunk
        )
    )
)
