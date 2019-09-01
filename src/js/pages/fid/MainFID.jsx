import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from '@material-ui/core'
import DrawingBoardComponent from './DrawingBoardComponent'
import ProjectSettings from '../ProjectSettings'
import * as backendActions from '../../actions/firebase-fid-actions'
import { sketchDataUpdated } from '../../actions/project-actions'
import ResultTable from '../../components/fid/ResultTable'
import CalculationProgress from '../../components/misc/CalculationProgress'

const mapStateToProps = (state, ownProps) => {
    return {
        sketchId: ownProps.match.params.sketchId,
        projectId: ownProps.match.params.projectId,
        sketch: state.projects.sketches[ownProps.match.params.sketchId],
        displayGenericProgress: state.notifications.displayGenericProgress
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestProjectLoad: (projectId, sketchId) => {
            dispatch(backendActions.loadFromBackend(projectId, sketchId))
        },
        sketchDataUpdated: (projectId, sketchId, fieldPath, value) => {
            dispatch(sketchDataUpdated(projectId, sketchId, fieldPath, value))
        },
        projectSaved: (projectData, projectId, sketchId) => {
            // dispatch(databaseActions.saveProjectToDb(projectData))
            dispatch(backendActions.saveToBackend(projectData, projectId, sketchId))
        },
        calculate: (projectData, projectId, sketchId) => {
            dispatch(backendActions.saveToBackend(projectData, projectId, sketchId))
            dispatch(backendActions.calculatePressureLoss(projectData, projectId, sketchId))
        },
        generateReport: () => {
            console.warn('Generating report is not yet implemented')
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

    handleActionByName = actionName => {
        switch (actionName) {
            case 'save':
                this.props.projectSaved(this.props.sketch.model, this.props.projectId, this.props.sketchId)
                break
            case 'calculate':
                this.props.calculate(this.props.sketch.model, this.props.projectId, this.props.sketchId)
                break
            case 'generate_report':
                this.props.generateReport(this.props.sketch.model, this.props.projectId, this.props.sketchId)
                break
            default:
        }
    }

    render() {
        const { displayTab } = this.state
        return (
            <div style={fullWidthFullHeight}>
                <Tabs value={displayTab} onChange={this.displayTabChanged}>
                    <Tab label="Sketch" />
                    <Tab label="Values" />
                    <Tab label="Result Table" />
                    {
                        this.props.displayGenericProgress ? <CalculationProgress /> : <></>
                    }
                </Tabs>
                {displayTab === 0 && <DrawingBoardComponent {...this.props} handleActionByName={this.handleActionByName} />}
                {displayTab === 1 && <ProjectSettings {...this.props} />}
                {displayTab === 2 && <ResultTable {...this.props} />}
            </div>
        )
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(MainFID)