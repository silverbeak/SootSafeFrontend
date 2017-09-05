import Header from './Header'
import { connect } from 'react-redux'
import { newFake } from '../actions/fake-actions'
import { userLoggedIn, userLoggedOut } from '../actions/login-actions'

const mapStateToProps = state => {
    console.log('What is the new state, dammit?!', state.users.user)
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
        },
        onNewFake: value => {
            console.log('NEW DISPATCH', dispatch, ownProps)
            dispatch(newFake(value))
        }
    }
}

const StatedHeader = connect(mapStateToProps, mapDispatchToProps)(Header)

export default StatedHeader
