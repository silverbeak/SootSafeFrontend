import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './js/fixed/HeaderComponent';
import Footer from './js/fixed/Footer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import reducer from './js/reducers';
import DrawingBoard from './js/pages/DrawingBoardComponent.js';

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const store = createStore(reducer, applyMiddleware(middleware, ReduxThunk));


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Header/>
                    
                    <ConnectedRouter history={history}>
                        <div>
                            <Route exact path="/" component={DrawingBoard}/>
                            <Route path="/about" component={DrawingBoard}/>
                            <Route path="/topics" component={DrawingBoard}/>
                        </div>
                    </ConnectedRouter>
                    
                    <Footer />
                </div>
            </Provider>
        );
    }
}

export default App;
