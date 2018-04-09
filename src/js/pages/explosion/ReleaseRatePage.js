import React from 'react'
import '../../../style/Rtable.css'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import * as actions from '../../actions/explosion/releaserate-actions'
import Stepper, { Step, StepButton } from 'material-ui/Stepper'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import ElementStep from './ElementStep'
import GasOrLiquidStep from './GasOrLiquidStep'
import ReleaseRateStep from './ReleaseRateStep'
import PoolStep from './PoolStep'
import ParameterStep from './ParameterStep'
import CalculateStep from './CalculateStep'
import IndoorOutdoorStep from './IndoorOutdoorStep'
import VentilationVelocityStep from './VentilationVelocityStep'
import ReleaseGradeStep from './ReleaseGradeStep'
import ReleaseTypeStep from './ReleaseTypeStep'
import VentilationAvailabilityStep from './VentilationAvailabilityStep'

class ReleaseRatePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            steps: [
                'Element', 
                'Primary state', 
                'Release rate', 
                'Source', 
                'Environment', 
                'Parameters',
                'Ventilation velocity',
                'Ventilation availability',
                'Release grade',
                'Release type',
                'Calculate'
            ],
            activeStep: 0,
            completed: [],
            stepRenderers: [
                ElementStep,
                GasOrLiquidStep,
                ReleaseRateStep,
                PoolStep,
                IndoorOutdoorStep,
                ParameterStep,
                VentilationVelocityStep,
                VentilationAvailabilityStep,
                ReleaseGradeStep,
                ReleaseTypeStep,
                CalculateStep
            ]
        }
    }

    handleChange(field) {
        return event => {
            console.log(`Field ${field} updated, ${event.target.value}`)
            this.props.valueUpdated(field, event.target.value)
        }
    }

    handleStep(index) {
        console.log('Going to step', index)
        this.state.completed[index] = true
        this.setState({ activeStep: index + 1 })
    }

    handleReset = () => {
        console.log('Resetting')
    }

    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 })
    }

    handleNext = () => {
        if (this.state.activeStep === this.state.steps.length - 1) {
            // We are finished. Send to backend...
            this.props.submitRequest(this.props.fields)
        } else {
            this.setState({ activeStep: this.state.activeStep + 1 })
        }
    }

    getStep = (index) => {
        return this.state.stepRenderers[index]
    }

    render() {
        const { classes } = this.props

        const navigatorBar = (
            <div className="stepper-details">
                {this.state.activeStep === this.state.steps.length ? (
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
                                <Button raised="true" color="primary" onClick={this.handleNext}>
                                    {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>)

        return (
            <div className="stepper-page">
                <div>
                    <Stepper
                        nonLinear
                        activeStep={this.state.activeStep}
                        alternativeLabel>
                        {this.state.steps.map((label, index) => {
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

                {this.getStep(this.state.activeStep)(this.handleChange.bind(this), this.props)}

                {navigatorBar}
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        fields: state.releaseRate.fields,
        gasList: state.releaseRate.gasList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        valueUpdated: (fieldName, value) => {
            dispatch(actions.fieldValueUpdated(fieldName, value))
        },
        elementUpdated: e => {
            dispatch(actions.elementUpdated(e.target.value))
        },
        submitRequest: fields => {
            dispatch(actions.submitReleaseRateCalculationRequest(fields))
        }
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
})

const StatedReleaseRatePage = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReleaseRatePage))

export default StatedReleaseRatePage

