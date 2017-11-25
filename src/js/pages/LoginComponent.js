import Login from './Login'
import { connect } from 'react-redux'
import { emailAndPasswordLoginAttempt, userLogoutRequested } from '../actions/login-actions'

const mapStateToProps = state => {
    return {
        user: state.users.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        attemptSignInWithEmailAndPassword: (name, pwd) => {
            dispatch(emailAndPasswordLoginAttempt(name, pwd))
        },
        signOut: () => {
            dispatch(userLogoutRequested())
        }
    }
}

const StatedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default StatedLogin