import React from 'react';
import TextField from 'material-ui/TextField'
import * as _ from '../../../node_modules/lodash/lodash'

class SketchComponent extends React.Component {
    
    constructor(props) {
        super(props)
    }
    
    singleField(field, name) {
        switch(field.type) {
            case String: 
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
            case Object: {
                return (
                    <span key={name}>
                        { 
                            _.map(field.children, (child, childName) => this.singleField(child, name + '-' + childName))
                        }
                    </span>
                )
            }
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