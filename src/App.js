import React, { Component } from 'react'
import './style/App.css'
import { mainStyle } from './js/MainStyle'
import { PaperbaseTheme } from './style/themes/paperbase/Paperbase'
import { withStyles, ThemeProvider } from '@material-ui/styles'
import Header from './js/fixed/header/HeaderComponent'
import Footer from './js/fixed/footer/Footer'
import About from './js/pages/About'
import { Provider } from 'react-redux'
import { Store, history } from './js/reducers/store'
import MainFID from './js/pages/fid/MainFID'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router'
import UserComponent from './js/components/UserComponent'
import { StatedNotifier } from './js/components/notifier'
import ReleaseRatePage from './js/pages/explosion/ReleaseRatePage'
import AtexStartPage from './js/pages/explosion/AtexStartPage'
import FeedbackDialog from './js/components/dialogs/FeedbackDialog'

import ReactGA from 'react-ga'
import StatedLoginProxy from './js/pages/LoginProxy';
import { StatedUserDashboard } from './js/pages/UserDashboard';

class App extends Component {

    constructor(props) {
        super(props)
        ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    render() {
        return (
            <Provider store={Store}>
                <ThemeProvider theme={PaperbaseTheme} >
                    <div className="App Site">

                        <ConnectedRouter history={history}>
                            <Header {...this.props} />
                            <div className="Site-content">
                                <Route exact path="/" component={StatedLoginProxy} />
                                <Route exact path="/dashboard" component={() => <StatedUserDashboard {...this.props} />} />
                                <Route path="/project/:projectId/sketch/:sketchId/board" component={MainFID} />
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
                </ThemeProvider>
            </Provider>
        );
    }

}

export default withStyles(mainStyle(PaperbaseTheme))(App)
