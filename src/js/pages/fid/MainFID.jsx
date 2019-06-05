import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import DrawingBoardComponent from './DrawingBoardComponent'
import ProjectSettings from '../ProjectSettings';
import * as backendActions from '../../actions/firebase-fid-actions'
import { sketchDataUpdated } from '../../actions/project-actions';

const mapStateToProps = (state, ownProps) => {
    return {
        sketchId: ownProps.match.params.sketchId,
        projectId: ownProps.match.params.projectId,
        sketch: state.projects.sketches[ownProps.match.params.sketchId]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestProjectLoad: (projectId, sketchId) => {
            dispatch(backendActions.loadFromBackend(projectId, sketchId))
        },
        sketchDataUpdated: (projectId, sketchId, fieldPath, value) => {
            dispatch(sketchDataUpdated(projectId, sketchId, fieldPath, value))
        }
    }
}

const fullWidthFullHeight = {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
}

class MainFID extends Component {

    constructor(props) {
        super(props)
        props.requestProjectLoad(props.projectId, props.sketchId)
        this.state = { displayTab: 0 }
    }

    componentWillReceiveProps(props) {
        // When a new project/sketch has been requested, we should fetch the data from the backend
        // TODO: Should probably reset selected parts and do a few more things to the DrawingBoard        
        if (props.sketchId !== this.props.sketchId) {
            this.props.requestProjectLoad(props.projectId, props.sketchId)
            // props.partSelected({})
        }
    }

    displayTabChanged = (event, displayTab) => {
        this.setState({ displayTab })
    }

    render() {
        const { displayTab } = this.state
        return (
            <div style={fullWidthFullHeight}>
                <Tabs value={displayTab} onChange={this.displayTabChanged}>
                    <Tab label="sketch" />
                    <Tab label="values" />
                    <Tab label="result Table" />

                </Tabs>
                    {displayTab === 0 && <DrawingBoardComponent {...this.props} />}
                    {displayTab === 1 && <ProjectSettings {...this.props} />}
                    {displayTab === 2 && <p>Result table here</p>}
            </div>
        )
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(MainFID)