import React from 'react'
import logo from '../../assets/images/logo.svg'
import Account from './Account';
import { history } from '../reducers/store'
import { connect } from 'react-redux'

class MainPage extends React.Component {
    render () {

        if (!!this.props.user) {
            history.push('/atex/start')
            return null
        } else {
            return (
                <span className="main-pane">
                    <span className="main-column left-column">
                        <Account />
                    </span>
    
                    <span className="column-divider" />
    
                    <span className="main-column right-column">
                        <h4>Welcome to</h4>
                        <img src={logo} height="75" alt="SootSafe Logo" />
    
                        <div className="tagline">
                            Efficient calculations, coming your way!
                        </div>
                    </span>
                </span>
            )
        }
    }
}


const mapStateToProps = state => {
    return {
        user: state.users.user
    }
}

const StatedMainPage = connect(mapStateToProps)(MainPage)

export default StatedMainPage