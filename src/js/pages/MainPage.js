import React from 'react'
import logo from '../../assets/images/logo.svg'

class MainPage extends React.Component {
    render () {
        return (
            <span>
                <h4>Welcome to</h4>
                <img src={logo} height="75" alt="SootSafe Logo" />
            </span>
        )
    }
}

export default MainPage