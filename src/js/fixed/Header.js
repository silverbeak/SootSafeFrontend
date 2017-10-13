import React from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import {fbApp} from '../firebase/firebase'

const styles = {
    textField: {
        marginLeft: "1em",
        marginRight: "1em",
        width: 200,
    }
}

class Header extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        fbApp.auth().onAuthStateChanged( user => {
            if (user) {
                // User logged in
                this.props.userLoggedIn(user)
            } else {
                // User logged out
                this.props.userLoggedOut()
            }
            this.setState({name: ''})
            this.setState({pwd: ''})
        })
    }

    logout() {
        fbApp.auth().signOut()
    }

    loginBtnClick(event) {
        fbApp.auth().signInWithEmailAndPassword(this.state.name, this.state.pwd)
        .catch( e => console.log('Error when logging in', e))
    }

    render() {

        const loginFields = <span>
            <TextField 
                id="name"
                label="Name"
                style={styles.textField}
                className="classes.textField"
                margin="normal"
                onChange={ event => this.setState({ name: event.target.value })}
                value={this.state.name}
            />

            <TextField 
                id="password"
                label="Password"
                type="password"
                style={styles.textField}
                className="classes.textField"
                margin="normal"
                onChange={ event => this.setState({ pwd: event.target.value })}
                value={this.state.pwd}
                InputLabelProps={{ shrink: true }}
            />

            <Button 
                raised
                onClick={this.loginBtnClick.bind(this)}>
                Log in
            </Button>
        </span>

        const logoutButton = <span><Button onClick={this.logout.bind(this)}>Log out</Button></span>

        const loginPanel = this.props.user ? logoutButton : loginFields
        const displayName = this.props.user ? this.props.user.displayName : ''

        return (
            <div className="App-header">
                <h2>Welcome {displayName}</h2>
                <div style={{background: 'white'}}>

                    {loginPanel}

                </div>
            </div>
        )
    }
}

export default Header