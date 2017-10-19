import Card from 'material-ui/Card'
import React from 'react'

import * as _ from '../../../node_modules/lodash/lodash.min'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadProjectIndices } from '../actions/backend-communicator-actions'

class ProjectList extends React.Component {
    
    constructor(props) {
        super(props)
        this.props.loadProjectData()
    }

    render() {

        console.log('Projects', this.props.projects)

        const projectLink = project => {
            return (
                <li key={project.id}>
                    <Link to={`/project/${project.id}`}>
                        {project.name}
                    </Link>
                </li>
            )
        }

        return (
            <Card>
                <ul>
                    { _.map(this.props.projects, projectLink) }
                </ul>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects.projectIndices
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadProjectData: () => {
            dispatch(loadProjectIndices())
        }
    }
}

const StatedProjectList = connect(mapStateToProps, mapDispatchToProps)(ProjectList)
export default StatedProjectList