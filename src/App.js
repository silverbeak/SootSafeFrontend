import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import Header from './js/fixed/HeaderComponent'
import Footer from './js/fixed/Footer'
import { Provider } from 'react-redux'
import { Store, history } from './js/reducers/store'
import { loadProjectIndices } from './js/actions/backend-communicator-actions'
import DrawingBoard from './js/pages/DrawingBoardComponent.js'
import StatedProjectList from './js/components/project-list'
import StatedSketchList from './js/components/sketch-list'
import StatedLogin from './js/pages/LoginComponent'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'
import UserComponent from './js/components/UserComponent'

Store.dispatch(loadProjectIndices())


class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <div className="App">
                    <Header/>
                    
                    <ConnectedRouter history={history}>
                        <div>
                            <Route exact path="/" component={StatedProjectList}/>
                            <Route path="/project/:projectId" component={StatedSketchList}/>
                            <Route path="/project/:projectId/sketch/:sketchId" component={DrawingBoard}/>
                            <Route path="/login" component={StatedLogin}/>
                        </div>
                    </ConnectedRouter>
                    
                    <Footer />
                    <UserComponent />
                </div>
            </Provider>
        );
    }
}

export default App;
