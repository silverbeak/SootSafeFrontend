import Header from './Header'
import { connect } from 'react-redux'
import { userLogoutRequested } from '../../actions/login-actions'
import { toggleFeedbackDialog } from '../../actions/feedback-actions'
import { push } from 'connected-react-router'

const mapStateToProps = state => {
    return {
        user: state.users.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        userLogoutRequested: () => {
            dispatch(userLogoutRequested())
        },
        pushHistory: path => { return () =>
            dispatch(push(path))
        },
        toggleFeedbackDialog: show => {
            dispatch(toggleFeedbackDialog(show))
        }
    }
}

const StatedHeader = connect(mapStateToProps, mapDispatchToProps)(Header)

export default StatedHeader
