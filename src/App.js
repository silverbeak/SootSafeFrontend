import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './js/fixed/HeaderComponent';
import Footer from './js/fixed/Footer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import reducer from './js/reducers';
import { loadProjectIndices } from './js/actions/backend-communicator-actions'
import DrawingBoard from './js/pages/DrawingBoardComponent.js';
import StatedProjectList from './js/components/project-list'
import StatedSketchList from './js/components/sketch-list'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const store = createStore(reducer, applyMiddleware(middleware, ReduxThunk));
store.dispatch(loadProjectIndices())


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Header/>
                    
                    <ConnectedRouter history={history}>
                        <div>
                            <Route exact path="/" component={StatedProjectList}/>
                            <Route path="/project/:projectId" component={StatedSketchList}/>
                            <Route path="/project/:projectId/sketch/:sketchId" component={DrawingBoard}/>
                        </div>
                    </ConnectedRouter>
                    
                    <Footer />
                </div>
            </Provider>
        );
    }
}

export default App;
