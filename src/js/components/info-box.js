import React from 'react'
import TextField from 'material-ui/TextField'
import * as actions from '../actions/project-actions'

import { connect } from 'react-redux'

class InfoBox extends React.Component {

    handleStateUpdate(event) {
        this.setState({ [event.target.id]: event.target.value })
        this.props.partInfoUpdated(this.props.selectedPart.key, event.target.id, event.target.value)
    }

    render() {
        const selectedPart = this.props.selectedPart
        if (!selectedPart.ssInfo) {
            return <span></span>
        }
        return (
            <span>
                <h4>Info about selected component</h4>
                Key: {selectedPart.key}
                <br />
                Comment: 
                <TextField 
                    id="comment"
                    className="classes.textField"
                    margin="normal"
                    onChange={this.handleStateUpdate.bind(this)}
                    value={this.state.comment}
                    />
                <br />
                Name: 
                <TextField 
                    id="name"
                    className="classes.textField"
                    margin="normal"
                    onChange={this.handleStateUpdate.bind(this)}
                    value={this.state.name}
                    />
                <br />
                NodeType: 
                <TextField 
                    id="nodeType"
                    className="classes.textField"
                    margin="normal"
                    onChange={this.handleStateUpdate.bind(this)}
                    value={this.state.nodeType}
                    />
            </span>
        )
    }

    _setStatesForComponents(props, fieldNames) {
        fieldNames.forEach( name => {
            const value = props.selectedPart.ssInfo ? props.selectedPart.ssInfo[name] : ''
            this.setState( { [name]: value ? value : '' } )
        })
    }

    componentWillReceiveProps(nextProps) {
        this._setStatesForComponents(nextProps, ['comment', 'name', 'nodeType'])
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