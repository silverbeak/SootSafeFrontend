import React from 'react'
import '../../../style/Rtable.css'
import { connect } from 'react-redux'
import * as actions from '../../actions/explosion/releaserate-actions'
import ElementStep from './ElementStep'
import GasOrLiquidStep from './GasOrLiquidStep'
import ReleaseRateStep from './ReleaseRateStep'
import ParameterStep from './ParameterStep'
import CalculateStep from './CalculateStep'
import IndoorOutdoorStep from './IndoorOutdoorStep'
import ReleaseGradeStep from './ReleaseGradeStep'
import ReleaseTypeStep from './ReleaseTypeStep'
import VentilationAvailabilityStep from './VentilationAvailabilityStep'

import { withStyles } from '@material-ui/core/styles'
import { Stepper, Step, StepButton, LinearProgress } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import ReactGA from 'react-ga'

import * as _ from 'lodash/lodash.min'

const steps = [
    'Element',
    'Primary state',
    'Environment',
    'Release rate',
    'Parameters',
    'Ventilation availability',
    'Release grade',
    'Release type',
    'Calculate'
]

const stepRenderers = [
    ElementStep,
    GasOrLiquidStep,
    IndoorOutdoorStep,
    ReleaseRateStep,
    ParameterStep,
    VentilationAvailabilityStep,
    ReleaseGradeStep,
    ReleaseTypeStep,
    CalculateStep
]

class ReleaseRatePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activeStep: 0,
            completed: [],
            showReportDialog: false
        }
    }

    componentDidMount() {
        this.props.fetchAtexProjectData(this.props.projectId)
        this.props.loadElements()
        this.props.resetReportLink()
    }

    handleChange = field => event => {
        // const floatValue = parseFloat(event.target.value) // Don't know why I did this. It only makes sense for float values, but this is used for everything
        const floatValue = event.target.value
        // console.log(`Field ${field} updated, ${floatValue}, of type ${typeof floatValue} (${event.target.value})`)
        this.props.valueUpdated(field, floatValue, this.props.projectId)
    }

    handleStep(index) {
        console.log('Going to step', index)
        const completed = _.clone(this.state.completed)
        completed[index] = true
        this.setState({ completed })
        this.setState({ activeStep: index + 1 })
    }

    handleReset = () => {
        console.log('Resetting')
    }

    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 })
    }

    handleNext = () => {
        if (this.state.activeStep === steps.length - 1) {
            // We are finished. Send to backend...
            this.props.submitRequest(this.props.atexProject)
            this.setState({ showReportDialog: true })
            ReactGA.event({
                category: 'atex',
                action: 'submitted atex request'
            })
        } else {
            this.setState({ activeStep: this.state.activeStep + 1 })
            ReactGA.event({
                category: 'atex',
                action: 'done with step',
                value: this.state.activeStep,
                label: steps[this.state.activeStep]
            })
        }
    }

    getStep = (index) => {
        return stepRenderers[index]
    }

    displayReportDialog = (show) => () => {
        this.setState({ showReportDialog: show })
    }

    render() {
        const { classes } = this.props
        const projectData = this.props.atexProject

        if (!projectData) return <div>Loading project data</div>

        const navigatorBar = (
            <div className="stepper-details">
                {this.state.activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed
                        </Typography>
                        <Button onClick={this.handleReset}>Reset</Button>
                    </div>
                ) : (
                        <div>
                            <div>
                                <Button
                                    disabled={this.state.activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.backButton}>
                                    Back
                                </Button>
                                <Button raised color="primary" onClick={this.handleNext}>
                                    {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>)

        const reportDialog =
            this.props.reportUrl ? (
                <Dialog
                    open={this.state.showReportDialog}
                    onClose={this.displayReportDialog(false)}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Your report is ready!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Your report has been generated.
                            <br />
                            <a href={this.props.reportUrl} target="_blank" rel="noopener noreferrer">Click here</a> to download your report. This link will be active for 24 hours.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.displayReportDialog(false)} color="primary" autoFocus>
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
            ) : (
                    <Dialog
                        open={this.state.showReportDialog}
                        onClose={this.displayReportDialog(false)}
                        aria-labelledby="responsive-dialog-title">
                        <DialogTitle id="responsive-dialog-title">{"Your report is being generated!"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Waiting for your report to be generated. This may take some time.<br />
                                Please do not close this window.<br />
                            </DialogContentText>
                            <LinearProgress />
                        </DialogContent>
                    </Dialog>
                )



        return (
            <div className="stepper-page">
                <div>
                    <Stepper
                        nonLinear
                        activeStep={this.state.activeStep}
                        alternativeLabel>
                        {steps.map((label, index) => {
                            return (
                                <Step key={label}>
                                    <StepButton
                                        // onClick={() => this.handleStep(index)}
                                        completed={this.state.completed[index]}>
                                        {label}
                                    </StepButton>
                                </Step>
                            );
                        })}
                    </Stepper>
                </div>

                {navigatorBar}

                {this.getStep(this.state.activeStep)(this.handleChange.bind(this), this.props, projectData.fields)}

                {navigatorBar}

                {reportDialog}
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        atexProject: state.releaseRate.atexProjects[ownProps.match.params.projectId],
        gasList: state.releaseRate.gasList,
        reportUrl: state.releaseRate.report.url,
        projectId: ownProps.match.params.projectId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        valueUpdated: (fieldName, value, projectId) => {
            dispatch(actions.fieldValueUpdated(fieldName, value, projectId))
        },
        elementUpdated: projectId => e => {
            dispatch(actions.elementUpdated(e.target.value, projectId))
        },
        submitRequest: atexProject => {
            dispatch(actions.submitReleaseRateCalculationRequest(atexProject))
        },
        resetReportLink: () => {
            dispatch(actions.resetReportLink())
        },
        loadElements: () => {
            dispatch(actions.loadElements())
        },
        fetchAtexProjectData: projectId => {
            dispatch(actions.fetchAtexProjectData(projectId))
        }
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
})

const StatedReleaseRatePage = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReleaseRatePage))

export default StatedReleaseRatePage

