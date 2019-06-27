import React, { Component } from 'react';
import { Button, ButtonGroup, Card } from '@material-ui/core'

class FidActionBar extends Component {
    

    save() {
        const { nodeDataArray, linkDataArray, metadata } = this.props.sketch.model
        const saveObject = Object.assign({}, { nodeDataArray, linkDataArray, metadata })
        this.props.projectSaved(saveObject, this.props.projectId, this.props.sketchId)
    }

    render() {
        return (
            <Card>
                <ButtonGroup>
                    <Button
                        onClick={this.save.bind(this)}
                    >
                        Save
                    </Button>
                    
                    <Button
                    >
                        Save and calculate
                    </Button>
                </ButtonGroup>
            </Card>
        );
    }
}

export default FidActionBar;