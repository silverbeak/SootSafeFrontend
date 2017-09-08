import Header from './Header'
import { connect } from 'react-redux'
import { userLoggedIn, userLoggedOut } from '../actions/login-actions'

const mapStateToProps = state => {
    return {
        user: state.users.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        userLoggedIn: user => {
            dispatch(userLoggedIn(user))
        },
        userLoggedOut: () => {
            dispatch(userLoggedOut())
        }
    }
}

const StatedHeader = connect(mapStateToProps, mapDispatchToProps)(Header)

export default StatedHeader
