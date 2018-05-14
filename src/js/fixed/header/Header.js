import React from 'react'
import Avatar from 'material-ui/Avatar'
import Menu, { MenuItem } from 'material-ui/Menu'
import { fbApp } from '../../firebase/firebase'
import PermIdentity from 'material-ui-icons/PermIdentity'
import { StatedProjectMenu } from '../../components/menus/project-menu'
import logo from '../../../assets/images/logo.svg'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Send from 'material-ui-icons/Send'

class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {

        const displayName = this.props.user ? this.props.user.displayName : ''

        const openUserMenu = event => {
            this.setState({ userMenuOpen: true, anchorEl: event.currentTarget })
        }

        const closeUserMenu = event => {
            this.setState({ userMenuOpen: false })
        }

        const logout = () => {
            closeUserMenu()
            this.props.userLogoutRequested()
            this.props.pushHistory()('/')
        }

        const closeAndNavigate = path => () => {
            console.log('Navigating to ', path)
            closeUserMenu()
            this.props.pushHistory()(path)
        }

        const openFeedbackDialog = () => {
            this.props.toggleFeedbackDialog(true)
        }

        const menuItems = () => {
            const open = this.state.userMenuOpen || false
            if (this.props.user) {
                return (
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={open}
                        onClose={closeUserMenu}
                    >
                        <MenuItem onClick={logout}>Log out</MenuItem>
                        {/* <MenuItem onClick={closeAndNavigate('/about')}>About SootSafe</MenuItem> */}
                    </Menu>
                )
            } else {
                return (
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={open}
                        onClose={closeUserMenu}
                    >
                        <MenuItem onClick={closeAndNavigate('/')}>Log in</MenuItem>
                        {/* <MenuItem onClick={closeAndNavigate('/about')}>About SootSafe</MenuItem> */}
                    </Menu>
                )
            }
        }

        const { classes } = this.props

        return (
            <div className="App-header">

                <div className="left-hand-menu-cluster">
                    {
                        this.props.user ?
                            // <div className="project-menu-launcher"><StatedProjectMenu /></div> :
                            <span></span> : // Remove this line, uncomment above to enable project menu
                            <span></span>
                    }
                    <a href="/">
                        <img src={logo} className="header-logo" />
                    </a>
                </div>



                <span className="right-user-menu">
                    {
                        this.props.user ?
                        (<Button
                            color="secondary"
                            variant="raised"
                            onClick={openFeedbackDialog}
                            style={{color: "white", marginRight: "1em"}}>
                            Feedback
                            <Send className={classes.rightIcon}>send</Send>
                        </Button>) :
                        <span></span>
                    }

                    <Button
                        onClick={openUserMenu}>
                            {
                                this.props.user && this.props.user.photoURL ?
                                <Avatar src={this.props.user.photoURL} /> :
                                <Avatar> <PermIdentity /> </Avatar>
                            }
                    </Button>
                    <span>
                        {this.props.user ? this.props.user.displayName : ''}
                    </span>
                    {menuItems()}
                </span>
            </div>
        )
    }
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
})

export default withStyles(styles)(Header)