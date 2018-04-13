import React from 'react'
import { connect } from 'react-redux'
import { loginFailed } from '../actions/login-actions';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import { fbApp } from '../firebase/firebase'


// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // Redirect to this page after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/releaserate/start',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
}

class Account extends React.Component {
    render() {
        return (
            <div>
                <p>Please sign in</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fbApp.auth()} />
            </div>
        )
    }
}

export default Account