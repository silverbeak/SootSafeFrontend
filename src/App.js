import React, { Component } from 'react'
// import logo from './logo.svg'
import './style/App.css'
import Header from './js/fixed/header/HeaderComponent'
import Footer from './js/fixed/footer/Footer'
import About from './js/pages/About'
import { Provider } from 'react-redux'
import { Store, history } from './js/reducers/store'
import { loadElements } from './js/actions/firebase-actions'
import MainFID from './js/pages/MainFID'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router'
import UserComponent from './js/components/UserComponent'
import { StatedNotifier } from './js/components/notifier'
// import { StatedResultTable } from './js/components/result-table'
import ReleaseRatePage from './js/pages/explosion/ReleaseRatePage'
import AtexStartPage from './js/pages/explosion/AtexStartPage'
import FeedbackDialog from './js/components/dialogs/feedback-dialog'

import ReactGA from 'react-ga'
import StatedLoginProxy from './js/pages/LoginProxy';
// Store.dispatch(loadProjectIndices())
Store.dispatch(loadElements())

class App extends Component {

    constructor() {
        super()
        ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    render() {
        return (
            <Provider store={Store}>
                <div className="App Site">
                    <Header />

                    <ConnectedRouter history={history}>
                        <div className="Site-content">
                            <Route exact path="/" component={StatedLoginProxy} />
                            <Route path="/project/:projectId/sketch/:sketchId/board" component={MainFID} />
                            {/* <Route path="/project/:projectId/sketch/:sketchId/table" component={StatedResultTable} /> */}
                            <Route path="/atex/start" component={AtexStartPage} />
                            <Route path="/atex/new" component={ReleaseRatePage} />
                            <Route path="/about" component={About} />
                        </div>
                    </ConnectedRouter>

                    <Footer />
                    <UserComponent path={history.location.pathname} />
                    <StatedNotifier />
                    <FeedbackDialog />
                </div>
            </Provider>
        );
    }
}

export default App;
