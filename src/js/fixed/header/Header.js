import React from 'react'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import Menu, { MenuItem } from 'material-ui/Menu'
import { fbApp } from '../../firebase/firebase'
import PermIdentity from 'material-ui-icons/PermIdentity'
import { StatedProjectMenu } from '../../components/menus/project-menu'
import logo from '../../../assets/images/logo.svg'

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
            this.props.userLogoutRequested()
            this.props.pushHistory()('/')
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
                        <MenuItem onClick={this.props.pushHistory('/login')}>Log in</MenuItem>
                        <MenuItem onClick={this.props.pushHistory('/createAccount')}>Create account</MenuItem>
                        <MenuItem onClick={this.props.pushHistory('/about')}>About SootSafe</MenuItem>
                    </Menu>
                )
            }
        }

        return (
            <div className="App-header">

                <div className="left-hand-menu-cluster">
                    <StatedProjectMenu className="left-header-menu" />
                    <a href="/">
                        <img src={logo} />
                    </a>
                </div>



                <span className="right-user-menu">
                    <Button
                        onClick={openUserMenu}>
                        <Avatar>
                            <PermIdentity />
                        </Avatar>
                    </Button>
                    {this.props.user ? this.props.user.email : ''}
                    {menuItems()}
                </span>

            </div>
        )
    }
}

export default Header