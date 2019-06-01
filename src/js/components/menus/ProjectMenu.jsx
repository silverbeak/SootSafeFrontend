import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { connect } from 'react-redux'
import Menu from '@material-ui/icons/Menu'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { push } from 'connected-react-router'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import NewProjectDialog from '../dialogs/NewProjectDialog'
import NewSketchDialog from '../dialogs/NewSketchDialog'
import { createNewSketch } from '../../actions/firebase-fid-actions'
import { createNewFidProject } from '../../actions/firebase-fid-actions'
import * as _ from 'lodash'

class ProjectMenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            projectDrawerOpen: false,
            projectsExpanded: [],
            newSketchDialogOpen: false,
            newProjectDialogOpen: false
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

    createNewSketchItem(projectId) {
        return (
            <ListItem
                button
                key='newSketch'
                onClick={() => this.setState({
                    newSketchDialogOpen: true,
                    projectId
                })}
            >
                <ListItemText inset primary='Create new sketch' />
            </ListItem>
        )
    }

    singleProject(project) {
        const sketches = _.map(project.sketches, this.generateSketchMenuItem(project.id))

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

    render() {

        const items = _.map(this.props.projects, this.singleProject.bind(this))

        return (
            <span>
                <IconButton
                    className="project-menu"
                    onClick={this.toggleDrawer.bind(this)}>
                    <Menu />
                </IconButton>

                <Drawer open={this.state.projectDrawerOpen} onClose={this.toggleDrawer.bind(this)}>
                    <List
                        subheader={<ListSubheader>Projects</ListSubheader>}
                        open={this.state.projectDrawerOpen}
                    >
                        <ListItem
                            button
                            key="new-project"
                            onClick={() => this.setState({ newProjectDialogOpen: true })}
                        >
                            <ListItemText inset primary="New project" />
                        </ListItem>

                        <Divider />

                        {items}
                    </List>
                </Drawer>

                <NewProjectDialog
                    submitNew={this.props.submitNewProject}
                    open={this.state.newProjectDialogOpen}
                    onClose={() => this.setState({ newProjectDialogOpen: false})}
                />
                
                <NewSketchDialog
                    submitNew={this.props.submitNewSketch(this.state.projectId)}
                    open={this.state.newSketchDialogOpen}
                    onClose={() => this.setState({ newSketchDialogOpen: false })}
                />
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
        submitNewSketch: projectId => sketchData  => {            
            dispatch(createNewSketch(sketchData, projectId))
        },
        submitNewProject: projectData => {
            dispatch(createNewFidProject(projectData))
        }
    }
}

export const StatedProjectMenu = connect(mapStateToProps, mapDispatchToPros)(ProjectMenu)

export default ProjectMenu