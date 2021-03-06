import React from 'react'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import * as actions from '../actions/project-actions'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import * as _ from '../../../node_modules/lodash/lodash.min'
import SketchComponent from './sketch-component'
import { AVAILABLE_TYPES } from '../reducers/component-field-index'

import { connect } from 'react-redux'

class InfoBox extends React.Component {

    handleTypeChange(event) {
        const value = event.target.value
        this.props.partTypeChanged(this.props.selectedPart.key, 'type', value)
    }

    handleStateUpdate(event) {
        const key = event.target.id
        const value = event.target.value
        this.props.partInfoUpdated(this.props.selectedPart.key, key, value)
    }

    typeSelector() {
        return (
            <Select
                id="type"
                value={this.props.selectedPart.type.name ? this.props.selectedPart.type.name : ''}
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
            </Select>)
    }

    mapElementFields(element) {
        if (element) {
            return _.map(element.fields, (field, name) => {
                return (
                    <ListItem key={name}>
                        <SketchComponent key={`${field.path}-${name}`} field={field} name={name} onChange={this.handleStateUpdate.bind(this)} />
                    </ListItem>
                )
            })
        }
    }

    render() {
        window.props = this.props
        const selectedPart = this.props.selectedPart
        if (!selectedPart || !selectedPart.fields) {
            return <span></span>
        }
        return (
            <List>
                <ListItem key="type-selector">
                    {this.typeSelector()}
                </ListItem>
                {this.mapElementFields(this.props.selectedPart)}
            </List>
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