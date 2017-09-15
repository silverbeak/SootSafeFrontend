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
                <TextField 
                    id="comment"
                    label="Comment"
                    className="classes.textField"
                    margin="normal"
                    onChange={this.handleStateUpdate.bind(this)}
                    value={this.state.comment}
                    />
                <br />
                <TextField 
                    id="name"
                    label="Name"
                    className="classes.textField"
                    margin="normal"
                    onChange={this.handleStateUpdate.bind(this)}
                    value={this.state.name}
                    />
                <br />
                <TextField 
                    id="nodeType"
                    label="Node type"
                    className="classes.textField"
                    margin="normal"
                    onChange={this.handleStateUpdate.bind(this)}
                    value={this.state.nodeType}
                    />
                <br />
                <TextField 
                    id="capacity"
                    label="Capacity"
                    className="classes.textField"
                    margin="normal"
                    onChange={this.handleStateUpdate.bind(this)}
                    value={this.state.capacity}
                    />
                <br />
                <TextField 
                    id="dimension"
                    label="Dimension"
                    className="classes.textField"
                    margin="normal"
                    onChange={this.handleStateUpdate.bind(this)}
                    value={this.state.dimension}
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
        this._setStatesForComponents(nextProps, ['comment', 'name', 'nodeType', 'capacity', 'dimension'])
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