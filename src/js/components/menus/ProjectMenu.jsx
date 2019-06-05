import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { connect } from 'react-redux'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/icons/Menu'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'

class ProjectMenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            projectDrawerOpen: false,
        }
    }

    render() {
        const { classes } = this.props

        return (
            <span>
                <IconButton
                    className="project-menu"
                    onClick={() => this.setState({ projectDrawerOpen: true })}>
                    <Menu />
                </IconButton>

                <Drawer open={this.state.projectDrawerOpen} onClose={() => this.setState({ projectDrawerOpen: false})}>
                    <List
                        subheader={
                            <ListSubheader style={{ color: 'white' }} onClick={() => this.setState({ projectDrawerOpen: false })} >
                                Menu
                            </ListSubheader>
                        }
                        open={this.state.projectDrawerOpen}
                    >
                        
                        <Link to="/dashboard" onClick={() => this.setState({ projectDrawerOpen: false })}>
                            <ListItem
                                button
                                key="dashboard-link"
                                className={clsx(classes.firebase, classes.item, classes.itemCategory)}
                            >
                                <ListItemText inset primary="Dashboard" />
                            </ListItem>
                        </Link>

                        <Link to="/projects" onClick={() => this.setState({ projectDrawerOpen: false })}>
                            <ListItem
                                button
                                key="project-link"
                                className={clsx(classes.firebase, classes.item, classes.itemCategory)}
                            >
                                <ListItemText inset primary="My Projects" />
                            </ListItem>
                        </Link>

                        <Link to="/settings" onClick={() => this.setState({ projectDrawerOpen: false })}>
                            <ListItem
                                button
                                key="settings-link"
                                className={clsx(classes.firebase, classes.item, classes.itemCategory)}
                            >
                                <ListItemText inset primary="My Settings" />
                            </ListItem>
                        </Link>

                        <Divider className={classes.divider} />
                    </List>
                </Drawer>
            </span>
        )
    }
}

export default ProjectMenu