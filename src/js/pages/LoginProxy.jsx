import React from 'react'
import { connect } from 'react-redux'
import StatedMainPage from './MainPage';
import AtexStartPage from './explosion/AtexStartPage'

class LoginProxy extends React.Component {
    render() {
        return (
            !!this.props.loggedInUser ?
                <AtexStartPage /> :
                <StatedMainPage />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.users.user
    }
}

const StatedLoginProxy = connect(mapStateToProps)(LoginProxy)

export default StatedLoginProxy