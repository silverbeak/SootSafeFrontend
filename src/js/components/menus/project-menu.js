import React from 'react'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux'
import Menu from 'material-ui-icons/Menu'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { push } from 'react-router-redux'
import { ExpandLess, ExpandMore } from 'material-ui-icons'
import Collapse from 'material-ui/transitions/Collapse'
import Drawer from 'material-ui/Drawer'
import * as _ from 'lodash'

class ProjectMenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            projectDrawerOpen: false,
            projectsExpanded: []
        }
    }

    generateSketchMenuItem = projectId => (sketch) => {

        const openSketch = () => {
            this.setState({ projectDrawerOpen: false })
            this.props.pushHistory(`/project/${projectId}/sketch/${sketch.id}`)
        }

        return (
            <ListItem
                button
                key={sketch.id}
                onClick={openSketch}>
                <ListItemText inset primary={sketch.name} />
            </ListItem>
        )
    }

    toggleProject(key, event) {
        const projectsExpanded = this.state.projectsExpanded
        projectsExpanded[key] = !projectsExpanded[key]
        this.setState({ projectsExpanded })
    }

    singleProject(project) {
        const sketches = _.map(project.sketches, this.generateSketchMenuItem(project.id))

        if (typeof project.id === 'undefined') debugger

        return (
            <ListItem
                button
                key={project.id}
                onClick={this.toggleProject.bind(this, project.id)}
            >
                <ListItemText inset primary={project.name} />
                {this.state.projectsExpanded[project.id] ? <ExpandLess /> : <ExpandMore />}
                <Collapse in={this.state.projectsExpanded[project.id]} transitionDuration="auto" unmountOnExit>
                    <List disablePadding>
                        {sketches}
                    </List>
                </Collapse>
            </ListItem>
        )
    }

    generateMenuFromProps(projects) {
        const items = _.map(projects, this.singleProject.bind(this))
        return (
            <List
                subheader={<ListSubheader>Projects</ListSubheader>}
                open={this.state.projectDrawerOpen}
            >
                {items}
            </List>
        )
    }

    toggleDrawer = () => {
        this.setState({ projectDrawerOpen: !this.state.projectDrawerOpen })
    }

    render() {

        const menu = this.generateMenuFromProps.bind(this, this.props.projects)

        return (
            <span>
                <IconButton
                    className="project-menu"
                    onClick={this.toggleDrawer.bind(this)}>
                    <Menu />
                </IconButton>

                <Drawer open={this.state.projectDrawerOpen} onRequestClose={this.toggleDrawer.bind(this)}>
                    {menu()}
                </Drawer>
            </span>
        )
    }
}


const mapStateToProps = state => {
    return {
        projects: state.projects.projectIndices
    }
}

const mapDispatchToPros = (dispatch, ownState) => {
    return {
        pushHistory: path => {
            dispatch(push(path))
        }
    }
}

export const StatedProjectMenu = connect(mapStateToProps, mapDispatchToPros)(ProjectMenu)

export default ProjectMenu