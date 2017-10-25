import React from 'react'
import Input, { ImportLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import TextField from 'material-ui/TextField'
import * as actions from '../actions/project-actions'
import * as _ from '../../../node_modules/lodash/lodash.min'
import SketchComponent from './sketch-component'
import { AVAILABLE_TYPES } from '../reducers/component-field-index'

import { connect } from 'react-redux'

class InfoBox extends React.Component {

    handleTypeChange(event) {
        const value = event.target.value
        const state = Object.assign({}, this.state)
        _.set(state, 'type', value)
        this.setState(state)
        this.props.partTypeChanged(this.props.selectedPart.key, 'type', value)
    }

    handleStateUpdate(event) {
        const key = event.target.id
        const value = event.target.value
        const state = Object.assign({}, this.state)
        _.set(state, key, value)
        this.setState(state)
        this.props.partInfoUpdated(this.props.selectedPart.key, key, value)
        // debugger
    }

    mapElementFields(element) {
        if (element) {
            return _.map(element.fields, (field, name) => {
                return <SketchComponent key={field.path} field={field} name={name} onChange={this.handleStateUpdate.bind(this)} />
            })
        }
    }

    render() {
        window.props = this.props
        const selectedPart = this.props.selectedPart
        if (!selectedPart.ssInfo) {
            return <span></span>
        }
        return (
            <span>
                <Select
                    id="type"
                    value={this.props.selectedPart.type.name ? this.props.selectedPart.type.name : '' }
                    onChange={this.handleTypeChange.bind(this)}
                    input={<Input />} >

                    { 
                        _.map(AVAILABLE_TYPES, (t, index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    value={index}> {t.label}
                                </MenuItem>
                            )
                        })
                    }
                </Select>

                <br />

                { this.mapElementFields(this.props.selectedPart) }

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
            dispatch(actions.partInfoUpdated(partKey, infoKey, value, ownProps.sketchId))
        },
        partTypeChanged: (partKey, infoKey, value) => {
            dispatch(actions.partTypeChanged(partKey, infoKey, value, ownProps.sketchId))
        }
    }
}

const StatedInfoBox = connect(mapStateToProps, mapDispatchToProps)(InfoBox)
export default StatedInfoBox