import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import DrawingBoardComponent from './DrawingBoardComponent'

function mapStateToProps(state, ownProps) {
    return {
        sketchId: ownProps.match.params.sketchId,
        projectId: ownProps.match.params.projectId,
        selectedPart: state.parts.selectedPart,
    }
}

const fullWidthFullHeight = {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
}

class MainFID extends Component {

    constructor(props) {
        super(props)
        this.state = { displayTab: 0 }
    }

    displayTabChanged = (event, displayTab) => {
        this.setState({ displayTab })
    }

    render() {
        const { displayTab } = this.state
        return (
            <div style={fullWidthFullHeight}>
                <Tabs value={displayTab} onChange={this.displayTabChanged}>
                    <Tab label="sketch" />
                    <Tab label="values" />
                    <Tab label="result Table" />

                </Tabs>
                    {displayTab === 0 && <DrawingBoardComponent sketchId={this.props.sketchId} projectId={this.props.projectId} />}
                    {displayTab === 1 && <p>Values here</p>}
                    {displayTab === 2 && <p>Result table here</p>}
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
)(MainFID)