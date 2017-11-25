import React from 'react'
import { loginFailed } from '../actions/login-actions';
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

const styles = {
    textField: {
        marginLeft: "1em",
        marginRight: "1em",
        width: 200,
    }
}

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = { name: '', pwd: '' }
    }

    loginBtnClick(event) {
        this.props.attemptSignInWithEmailAndPassword(this.state.name, this.state.pwd)
    }

    logout() {
        this.props.signOut()
    }

    render() {
        const loginFields = <span>
            <TextField
                id="name"
                label="Name"
                // style={styles.textField}
                className="classes.textField"
                margin="normal"
                onChange={event => this.setState({ name: event.target.value })}
                value={this.state.name}
            />

            <br />

            <TextField
                id="password"
                label="Password"
                type="password"
                style={styles.textField}
                className="classes.textField"
                margin="normal"
                onChange={event => this.setState({ pwd: event.target.value })}
                value={this.state.pwd}
                InputLabelProps={{ shrink: true }}
            />

            <br />

            <Button
                raised
                onClick={this.loginBtnClick.bind(this)}>
                Log in
            </Button>
        </span>

        const logoutButton = <span><Button onClick={this.logout.bind(this)}>Log out</Button></span>

        const loginPanel = this.props.user ? logoutButton : loginFields

        return loginPanel
    }
}

export default Login