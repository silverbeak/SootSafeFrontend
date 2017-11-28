import React from 'react'
import { connect } from 'react-redux'

class ErrorMessageBox extends React.Component {

    render() {
        if (!this.props.errorMessage) return ''

        return (
            <div>
                <h4>{this.props.title}</h4>
                <pre>
                    {this.props.errorMessage}
                </pre>
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

export const StatedErrorMessageBox = connect(mapStateToProps)(ErrorMessageBox)

export default ErrorMessageBox
