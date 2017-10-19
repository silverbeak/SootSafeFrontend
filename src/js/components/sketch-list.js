import Card from 'material-ui/Card'
import React from 'react'

import * as _ from '../../../node_modules/lodash/lodash.min'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class SketchList extends React.Component {

    render() {
        const sketchLink = sketch => {
            return (
                <li key={sketch.id}>
                    <Link to={`/project/${this.props.params.projectId}/sketch/${sketch.id}`} >
                        { sketch.name }
                    </Link>
                </li>
            )
        }

        if (this.props.project) {
            return (
                <Card>
                    <ul>
                        { _.map(this.props.project.sketches, sketchLink) }
                    </ul>
                </Card>
            )
        } else {
            return <span></span>
        }

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        params: ownProps.match.params,
        project: state.projects.projectIndices[ownProps.match.params.projectId]
    }
}

const StatedSketchList = connect(mapStateToProps)(SketchList)
export default StatedSketchList