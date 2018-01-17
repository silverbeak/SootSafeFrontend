import React from 'react'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux'
import Menu from 'material-ui-icons/Menu'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { push } from 'react-router-redux'
import { ExpandLess, ExpandMore } from 'material-ui-icons'
import Collapse from 'material-ui/transitions/Collapse'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import { StatedNewProjectDialog, StatedNewSketchDialog } from '../dialogs/new-project-dialog'
import * as _ from 'lodash'
import * as dialogActions from '../../actions/dialog-actions';

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
            this.props.pushHistory(`/project/${projectId}/sketch/${sketch.id}/board`)
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

    createNewSketch(projectId) {
        return () => {
            this.props.createNewSketch(projectId)
        }
    }

    createNewSketchItem(projectId) {
        return (
            <ListItem
                button
                key='newSketch'
                onClick={this.createNewSketch(projectId)}
            >
                <ListItemText inset primary='Create new sketch' />
            </ListItem>
        )
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
                <Collapse in={this.state.projectsExpanded[project.id]} unmountOnExit>
                    <List disablePadding>
                        {this.createNewSketchItem(project.id)}
                        <Divider />
                        {sketches}
                    </List>
                </Collapse>
            </ListItem>
        )
    }

    toggleDrawer = () => {
        this.setState({ projectDrawerOpen: !this.state.projectDrawerOpen })
    }

    newProject() {
        this.props.createNewProject()
    }

    render() {

        const items = _.map(this.props.projects, this.singleProject.bind(this))

        return (
            <span>
                <IconButton
                    className="project-menu"
                    onClick={this.toggleDrawer.bind(this)}>
                    <Menu />
                </IconButton>

                <Drawer open={this.state.projectDrawerOpen} onRequestClose={this.toggleDrawer.bind(this)}>
                    <List
                        subheader={<ListSubheader>Projects</ListSubheader>}
                        open={this.state.projectDrawerOpen}
                    >
                        <ListItem
                            button
                            key="new-project"
                            onClick={this.newProject.bind(this)}
                        >
                            <ListItemText inset primary="New project" />
                        </ListItem>

                        <Divider />

                        {items}
                    </List>
                </Drawer>

                <StatedNewProjectDialog />
                <StatedNewSketchDialog />
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
        },
        createNewSketch: projectId => {
            dispatch(dialogActions.createNewSketchDialog(projectId))
        },
        createNewProject: projectName => {
            dispatch(dialogActions.createNewProjectDialog())
        }
    }
}

export const StatedProjectMenu = connect(mapStateToProps, mapDispatchToPros)(ProjectMenu)

export default ProjectMenu