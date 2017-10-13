import React from 'react'
import TextField from 'material-ui/TextField'
import * as actions from '../actions/project-actions'
import * as _ from '../../../node_modules/lodash/lodash.min'

import { connect } from 'react-redux'

class InfoBox extends React.Component {

    handleStateUpdate(event) {
        const key = event.target.id
        const value = event.target.value
        const state = Object.assign({}, this.state)
        _.set(state, key, value)
        this.setState(state)
        this.props.partInfoUpdated(this.props.selectedPart.key, event.target.id, event.target.value)
        // debugger
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
                    id="dimension.diameter"
                    label="Diameter"
                    className="classes.textField"
                    margin="normal"
                    onChange={this.handleStateUpdate.bind(this)}
                    value={this.state.dimension.diameter}
                    />
                <br />
                <TextField 
                    id="dimension.length"
                    label="Length"
                    className="classes.textField"
                    margin="normal"
                    onChange={this.handleStateUpdate.bind(this)}
                    value={this.state.dimension.length}
                    />
                <br />
                <TextField 
                    id="pressureloss"
                    label="Pressure Loss"
                    className="classes.textField"
                    margin="normal"
                    onChange={this.handleStateUpdate.bind(this)}
                    value={this.state.pressureloss}
                    />
            </span>
        )
    }

    _setStatesForComponents(props, fieldNames) {
        const state = Object.assign({}, this.state)
        fieldNames.forEach( name => {
            const value = _.get(props.selectedPart.ssInfo, name, '')
            _.set(state, name, value)
        })
        this.setState(state)
    }

    componentWillReceiveProps(nextProps) {
        const propKeys = ['comment', 'name', 'nodeType', 'capacity', 'dimension.diameter', 'dimension.length', 'pressureloss']
        this._setStatesForComponents(nextProps, propKeys)
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