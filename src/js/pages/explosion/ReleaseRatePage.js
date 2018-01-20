import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import * as actions from '../../actions/explosion/releaserate-actions'
import Stepper, { Step, StepButton } from 'material-ui/Stepper'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import GasOrLiquidStep from './GasOrLiquidStep'
import ReleaseRateStep from './ReleaseRateStep'
import PoolStep from './PoolStep'
import ParameterStep from './ParameterStep'

class ReleaseRatePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            steps: ['Liquid/Gas', 'Release rate', 'Source', 'Parameters', 'Calculate'],
            activeStep: 3,
            completed: [],
            stepDescriptions: [
                'Is the leakage liquid or gas?',
                'Will the release rate need to be calculated?',
                'Will evaporation be from pool?',
                'Collecting data',
                'Verify data and calculate'
            ],
            stepRenderers: [
                GasOrLiquidStep,
                ReleaseRateStep,
                PoolStep,
                ParameterStep,
                ReleaseRateStep
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

    getStepContent(index) {
        return this.state.stepDescriptions[index]
    }

    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 })
    }

    handleNext = () => {
        this.setState({ activeStep: this.state.activeStep + 1 })
    }

    getStep = (index) => {
        return this.state.stepRenderers[index]
    }

    render() {
        const {classes} = this.props
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
                                        onClick={() => this.handleStep(index)}
                                        completed={this.state.completed[index]}>
                                        {label}
                                    </StepButton>
                                </Step>
                            );
                        })}
                    </Stepper>

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
                                    <Typography className={classes.instructions}>
                                        {this.getStepContent(this.state.activeStep)}
                                    </Typography>
                                    <div>
                                        <Button
                                            disabled={this.state.activeStep === 0}
                                            onClick={this.handleBack}
                                            className={classes.backButton}>
                                            Back
                                        </Button>
                                        <Button raised color="primary" onClick={this.handleNext}>
                                            {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>

                <br />
                {this.getStep(this.state.activeStep)(this.handleChange.bind(this), this.props)}
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        fields: state.releaseRate.fields
    }
}

const mapDispatchToProps = dispatch => {
    return {
        valueUpdated: (fieldName, value) => {
            dispatch(actions.fieldValueUpdated(fieldName, value))
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

