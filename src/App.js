import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import Header from './js/fixed/header/HeaderComponent'
import Footer from './js/fixed/footer/Footer'
import { Provider } from 'react-redux'
import { Store, history } from './js/reducers/store'
import { loadProjectIndices } from './js/actions/backend-communicator-actions'
import DrawingBoard from './js/pages/DrawingBoardComponent.js'
import MainPage from './js/pages/MainPage.js'
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
                            <Route exact path="/" component={MainPage}/>
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
