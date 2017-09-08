import React from 'react'
import TextField from 'material-ui/TextField'
import * as actions from '../actions/drawing-board-actions'

import { connect } from 'react-redux'

class InfoBox extends React.Component {

    render() {
        const selectedPart = this.props.selectedPart
        if (!selectedPart) return <span></span>
        return (
            <span>
                <h4>Info about selected component</h4>
                Key: {selectedPart.key}
                <br />
                Comment: {selectedPart.comment}
                <br />
                Comment: 
                <TextField 
                    id="comment"
                    label="Comment"
                    className="classes.textField"
                    margin="normal"
                    onChange={ event => { this.props.partInfoUpdated('comment', event.target.value) }}
                    value={selectedPart.comment}
                    />
            </span>
        )
    }
}


const mapStateToProps = state => {
    return {
        selectedPart: state.parts.selectedPart
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        partInfoUpdated: (key, value) => {
            dispatch(actions.partInfoUpdated(key, value))
        }
    }
}

const StatedInfoBox = connect(mapStateToProps, mapDispatchToProps)(InfoBox)
export default StatedInfoBox