import React from 'react'
import TextField from 'material-ui/TextField'
import * as actions from '../actions/project-actions'

import { connect } from 'react-redux'

class InfoBox extends React.Component {

    render() {
        const selectedPart = this.props.selectedPart
        if (!selectedPart.ssInfo) return <span></span>
        const ssInfo = selectedPart.ssInfo ? selectedPart.ssInfo : {}
        return (
            <span>
                <h4>Info about selected component</h4>
                Key: {selectedPart.key}
                <br />
                Comment: 
                <TextField 
                    id="comment"
                    label="Comment"
                    className="classes.textField"
                    margin="normal"
                    onChange={ event => { this.props.partInfoUpdated(selectedPart.key, 'comment', event.target.value) }}
                    value={ssInfo.comment}
                    />
                <br />
                Name: 
                <TextField 
                    id="name"
                    label="Name"
                    className="classes.textField"
                    margin="normal"
                    onChange={ event => { this.props.partInfoUpdated(selectedPart.key, 'name', event.target.value) }}
                    value={ssInfo.name}
                    />
                <br />
                NodeType: 
                <TextField 
                    id="nodetype"
                    label="NodeType"
                    className="classes.textField"
                    margin="normal"
                    onChange={ event => { this.props.partInfoUpdated(selectedPart.key, 'nodeType', event.target.value) }}
                    value={ssInfo.nodeType}
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
        partInfoUpdated: (partKey, infoKey, value) => {
            dispatch(actions.partInfoUpdated(partKey, infoKey, value))
        }
    }
}

const StatedInfoBox = connect(mapStateToProps, mapDispatchToProps)(InfoBox)
export default StatedInfoBox