import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import { fbApp } from '../firebase/firebase'


// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // Redirect to this page after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/atex/start',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            customParameters: {
                // Forces account selection even when one account
                // is available.
                prompt: 'select_account'
            }
        }
    ],
    tosUrl: 'https://sootsafe.com/app/tos'
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