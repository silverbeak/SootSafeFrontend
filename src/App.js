import React, { Component } from 'react'
// import logo from './logo.svg'
import './style/App.css'
import Header from './js/fixed/header/HeaderComponent'
import Footer from './js/fixed/footer/Footer'
import About from './js/pages/About'
import { Provider } from 'react-redux'
import { Store, history } from './js/reducers/store'
import { loadProjectIndices } from './js/actions/backend-communicator-actions'
import DrawingBoard from './js/pages/DrawingBoardComponent.js'
import MainPage from './js/pages/MainPage.js'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'
import UserComponent from './js/components/UserComponent'
import { StatedNotifier } from './js/components/notifier'
import { StatedResultTable } from './js/components/result-table'
import ReleaseRatePage from './js/pages/explosion/ReleaseRatePage'

Store.dispatch(loadProjectIndices())


class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <div className="App Site">
                    <Header />

                    <ConnectedRouter history={history}>
                        <div className="Site-content">
                            <Route exact path="/" component={MainPage} />
                            <Route path="/project/:projectId/sketch/:sketchId/board" component={DrawingBoard} />
                            <Route path="/project/:projectId/sketch/:sketchId/table" component={StatedResultTable} />
                            <Route path="/releaserate/start" component={ReleaseRatePage} />
                            <Route path="/about" component={About} />
                        </div>
                    </ConnectedRouter>

                    <Footer />
                    <UserComponent path={history.location.pathname} />
                    <StatedNotifier />
                </div>
            </Provider>
        );
    }
}

export default App;
