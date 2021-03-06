import React from 'react'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { CreateNewFolder } from '@material-ui/icons'
import { List, ListSubheader, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { push } from 'connected-react-router'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import NewProjectDialog from '../../components/dialogs/NewProjectDialog'
import NewSketchDialog from '../../components/dialogs/NewSketchDialog'
import { createNewSketch } from '../../actions/firebase-fid-actions'
import { createNewFidProject } from '../../actions/firebase-fid-actions'
import { createNewAtexProject } from '../../actions/explosion/releaserate-actions'
import * as _ from 'lodash'
import { DuctFan, Explosion } from '../misc/SootIcons'
import { withStyles } from '@material-ui/styles'

const styles = {
    projectIcon: {
        minWidth: 'unset',
    },
    projectText: {
        paddingLeft: '1em',
    },
}

class ProjectList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            projectDrawerOpen: false,
            projectsExpanded: [],
            newSketchDialogOpen: false,
            newProjectDialogOpen: false
        }
    }

    generateSketchMenuItem = projectId => sketch => {

        const openSketch = () => {
            this.setState({ projectDrawerOpen: false })
            this.props.pushHistory(`/project/${projectId}/sketch/${sketch.id}/board`)
        }

        return (
            <ListItem
                button
                key={sketch.id}
                onClick={openSketch}>
                <ListItemText inset primary={sketch.name.value} />
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

    singleFidProject(project) {
        const { classes } = this.props
        const sketches = _.map(project.sketches, this.generateSketchMenuItem(project.id))

        return (
            <ListItem
                button
                key={project.id}
                onClick={this.toggleProject.bind(this, project.id)}
            >
                <ListItemIcon className={classes.projectIcon}>
                    <DuctFan />
                </ListItemIcon>
                <ListItemText className={classes.projectText} inset primary={project.name} />
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

    singleAtexProject(project) {
        const { classes } = this.props
        const sketches = _.map(project.sketches, this.generateSketchMenuItem(project.id))

        return (
            <ListItem
                button
                key={project.id}
                onClick={this.toggleProject.bind(this, project.id)}
            >
                <ListItemIcon className={classes.projectIcon}>
                    <Explosion />
                </ListItemIcon>
                <ListItemText className={classes.projectText} inset primary={project.name} />
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
        const { classes } = this.props
        const fidProjects = _.map(this.props.fidProjects, this.singleFidProject.bind(this))
        const atexProjects = _.map(this.props.atexProjects, this.singleAtexProject.bind(this))

        return (
            <span>

                <List
                    subheader={<ListSubheader>My Projects</ListSubheader>}
                    open={this.state.projectDrawerOpen}
                >
                    {fidProjects}
                    {atexProjects}
                </List>

                <Button
                    color="primary"
                    variant="contained"
                    key="new-project"
                    onClick={() => this.setState({ newProjectDialogOpen: true })}
                >
                    Create new project
                    <CreateNewFolder 
                        className={classes.rightIcon} 
                    />
                </Button>

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
        fidProjects: state.projects.projectIndices,
        atexProjects: state.releaseRate.atexProjectIndices
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
            if (projectData.projectType === 'atex') {
                dispatch(createNewAtexProject(projectData))
            } else {
                dispatch(createNewFidProject(projectData))
            }
        }
    }
}

export const StatedProjectList = connect(mapStateToProps, mapDispatchToPros)(withStyles(styles)(ProjectList))

export default (ProjectList)