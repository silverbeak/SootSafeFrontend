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
import ReleaseRatePage from './js/pages/atex/ReleaseRatePage'
import AtexStartPage from './js/pages/atex/AtexStartPage'
import FeedbackDialog from './js/components/dialogs/FeedbackDialog'

import ReactGA from 'react-ga'
import StatedLoginProxy from './js/pages/LoginProxy';
import UserDashboard from './js/pages/dashboard/UserDashboard';
import UserSettings from './js/pages/user/UserSettings';
import Projects from './js/pages/Projects';
import { makeStyles, createStyles } from '@material-ui/core';

const styles = makeStyles(theme => createStyles({
    content: {
        display: 'flex',
        padding: theme.spacing(1),
        flex: 1,
        height: '92vh',
        paddingTop: '4rem',
    },
}))

const App = function (props) {

    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);

    const classes = styles()

    return (
        <Provider store={Store}>
            <ThemeProvider theme={PaperbaseTheme} >
                <ConnectedRouter history={history}>
                    <Header {...props} />
                    <div className={classes.content}>
                        <Route exact path="/" component={() => <StatedLoginProxy {...props} />} />
                        <Route exact path="/dashboard" component={() => <UserDashboard />} />
                        <Route path="/project/:projectId/sketch/:sketchId/board" component={MainFID} />
                        <Route exact path="/atex/start" component={AtexStartPage} />
                        {/* <Route exact path="/atex/new" component={ReleaseRatePage} /> */}
                        <Route path="/atex/:projectId" component={ReleaseRatePage} />
                        <Route path="/settings" component={UserSettings} />
                        <Route path="/projects" component={Projects} />
                        <Route path="/about" component={About} />
                    </div>
                </ConnectedRouter>

                {/* <Footer /> */}
                <UserComponent path={history.location.pathname} />
                <StatedNotifier />
                <FeedbackDialog />
            </ThemeProvider>
        </Provider>
    );

}

export default withStyles(mainStyle(PaperbaseTheme))(App)
