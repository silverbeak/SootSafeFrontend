import React from 'react'
import ProjectMenu from '../../components/menus/ProjectMenu'
import logo from '../../../assets/images/logo.svg'

import PermIdentity from '@material-ui/icons/PermIdentity'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Send from '@material-ui/icons/Send'
import { AppBar, Toolbar } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const drawerWidth = 240

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
})

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

        const showMenu = !!this.props.user && process.env.REACT_APP_DISPLAY_PROJECT_MENU === 'true'

        return (
            <AppBar position="fixed" className={classes.appBar} >
                <Toolbar disableGutters={true} style={{ alignItems: "stretch" }} className="App-header">

                    <div className="left-hand-menu-cluster">
                        {
                            showMenu ?
                                <div className="project-menu-launcher"><ProjectMenu {...this.props} /></div> :
                                <span></span>
                        }
                        <a href="/">
                            <img src={logo} className="header-logo" alt="Header logo" />
                        </a>
                    </div>



                    <span className="right-user-menu">
                        {
                            this.props.user ?
                                (<Button
                                    color="secondary"
                                    variant="contained"
                                    onClick={openFeedbackDialog}
                                    style={{ color: "white", marginRight: "1em" }}>
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
                            {displayName}
                        </span>
                        {menuItems()}
                    </span>
                </Toolbar>
            </AppBar>
        )
    }
}


export default withStyles(styles)(Header)