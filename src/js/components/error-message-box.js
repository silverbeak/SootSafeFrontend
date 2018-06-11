import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { clearAllErrorMessages } from '../actions/error-message-actions'

const errorMessageBoxStyle = {
    display: 'flex',
    flexDirection: 'column'
}

const clearButtonStyle = {
    alignSelf: 'flex-end',
    marginRight: '.4em'
}

class ErrorMessageBox extends React.Component {

    clear() {
        this.props.clear()
    }

    render() {
        if (!this.props.errorMessage) return ''

        return (
            <div style={errorMessageBoxStyle}>
                <h4>{this.props.title}</h4>
                <pre>
                    {this.props.errorMessage}
                </pre>
                <br />

                <Button style={clearButtonStyle} onClick={this.clear.bind(this)}>Clear</Button>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        title: state.errorMessages.title,
        errorMessage: state.errorMessages.errorMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clear: () => {
            dispatch(clearAllErrorMessages())
        }
    }
}

export const StatedErrorMessageBox = connect(mapStateToProps, mapDispatchToProps)(ErrorMessageBox)

export default ErrorMessageBox
