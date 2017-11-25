import React from 'react'
import { connect } from 'react-redux'
import { fbApp } from '../firebase/firebase'
import * as actions from '../actions/login-actions'

class UserComponent extends React.Component {

    constructor(props) {
        super(props)
        fbApp.auth().onAuthStateChanged( user => {
            console.log('Changed login status', user)
            if (user) {
                // User logged in
                this.props.userLoggedIn(user)
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

const mapStateToProps = state => { return {} }

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        userLoggedIn: user => {
            dispatch(actions.userLoggedIn(user))
        },
        userLoggedOut: () => {
            dispatch(actions.userLoggedOut())
        }
    }
}

const StatedUserComponent = connect(mapStateToProps, mapDispatchToProps)(UserComponent)

export default StatedUserComponent