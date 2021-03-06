import React from 'react';
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import * as _ from '../../../node_modules/lodash/lodash'

class SketchComponent extends React.Component {

    checkboxUpdate(callback, field) {
        return function(event, checked) {
            const target = {
                id: field.path,
                value: checked
            }

            event.target = target

            callback(event)
        }
    }
    
    singleField(field, name) {
        switch(field.type) {
            case String:
            case 'String':
                return (
                    <span key={name}>
                        <TextField 
                            id={field.path}
                            label={name}
                            className="classes.textField"
                            margin="normal"
                            onChange={this.props.onChange}
                            value={field.value}
                            />
                            {field.unit}
                        <br />
                    </span>
                )
            case Number:
            case 'Number':
                return (
                    <span key={name}>
                        <TextField 
                            id={field.path}
                            type="number"
                            label={name}
                            className="classes.textField"
                            margin="normal"
                            onChange={this.props.onChange}
                            value={field.value}
                            />
                            {field.unit}
                        <br />
                    </span>
                )
            case Boolean:
            case 'Boolean':
                return (
                    <span key={name}>
                        <FormControlLabel
                            control = {
                                <Checkbox
                                    checked={field.value === 'true' || field.value === true}
                                    onChange={this.checkboxUpdate(this.props.onChange, field)}
                                    value={name}
                                />
                            }
                            label={name}
                    />
                    </span>
                )
            case Object:
            case 'Object':
                return (
                    <span key={name}>
                        { 
                            _.map(field.children, (child, childName) => this.singleField(child, name + '-' + childName))
                        }
                    </span>
                )
            default: return ''
            
        }
    }
    
    render() {
        return (
            <span>
                { this.singleField(this.props.field, this.props.name) }
            </span>
        )
    }
}

export default SketchComponent