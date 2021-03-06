import React from 'react'
import { connect } from 'react-redux'
import { fbApp } from '../firebase/firebase'
import * as actions from '../actions/login-actions'

class UserComponent extends React.Component {

    constructor(props) {
        super(props)
        fbApp.auth().onAuthStateChanged( user => {
            if (user) {
                // User logged in
                this.props.userLoggedIn(user, props.path)
            } else {
                // User logged out
                this.props.userLoggedOut()
            }
        })
    }

    render() {
        return <span></span>
    }
}

const mapStateToProps = (state, ownProps) => { 
    return { path: ownProps.path }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        userLoggedIn: (user, path) => {
            dispatch(actions.userLoggedIn(user, path))
        },
        userLoggedOut: () => {
            dispatch(actions.userLoggedOut())
        }
    }
}

const StatedUserComponent = connect(mapStateToProps, mapDispatchToProps)(UserComponent)

export default StatedUserComponent