import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from '@material-ui/core'
import SketchComponent from '../components/sketch-component'
import * as _ from '../../../node_modules/lodash/lodash'

const valueTableStyle = {
    display: 'flex',
    flex: 1,
    margin: '2em'
}

class ProjectSettings extends Component {

    handleStateUpdate(event) {
        const key = event.target.id
        const value = event.target.value
        const { projectId, sketchId } = this.props
        this.props.sketchDataUpdated(projectId, sketchId, key, value)
    }

    mapElementFields(field) {
        if (field) {
            return (
                <ListItem key={field.name}>
                    <SketchComponent key={`${field.path}-${field.name}`} field={field} name={field.name} onChange={this.handleStateUpdate.bind(this)} />
                </ListItem>
            )
        }
    }

    render() {
        return this.props.sketch ?
            <div style={valueTableStyle}>
                <List>
                    {_.map(this.props.sketch.model.sketchData.fields, this.mapElementFields.bind(this))}
                </List>
            </div>
            :
            <div>Loading data</div>
    }
}

export default ProjectSettings;