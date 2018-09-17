import React from 'react'
import go from 'gojs'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { initDrawingBoard } from '../gojs/board-tool'
import { initPalette } from '../gojs/palette-tool'
import ResultBox from '../components/result-box'
import { StatedErrorMessageBox } from '../components/error-message-box'
import * as _ from '../../../node_modules/lodash/lodash.min.js'
import { createNodeTemplate } from '../gojs/node-template'
import { GojsDiagram } from 'react-gojs'
import { Input, TextField } from '@material-ui/core';

const boardContainerStyle = {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignContent: 'stretch'
    // justifyContent: "flex-start"
}

const paletteStyle = {
    flex: 1,
    margin: ".4em"
}

const boardAndInfoStyle = {
    flex: 5,
    display: "flex",
    flexDirection: "row",
    paddingLeft: ".4em",
    paddingTop: ".4em"
}

const boardStyle = {
    display: "flex",
    flex: "3 0 0"
}

const infoBoxStyle = {
    flex: 2
}

const errorBoxStyle = {
    marginTop: ".4em",
    flex: 1
}

const rightHandCards = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    flex: "1 1",
    marginLeft: ".4em",
    paddingLeft: ".4em",
    marginRight: ".4em",
    paddingRight: ".4em"
}

const fullWidthFullHeight = {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
}

class DrawingBoard extends React.Component {

    constructor(props) {
        super(props)
        const { projectId, sketchId } = props
        this.sketchId = sketchId
        this.projectId = projectId
        this.state = { initiated: false, displayTab: 0 }
        props.requestProjectLoad(projectId, sketchId)
    }

    onSelectionChanged(part) {
        if (part.diagram.selection.count > 1) {
            this.props.partSelected({ info: 'More than one part selected' })
            return
        }
        if (part.diagram.selection.count < 1) {
            this.props.partSelected({ info: 'No parts selected' })
            return
        }
        if (part.key) {
            const partFromModel = _.find(this.props.sketches[this.sketchId].model.nodeDataArray, n => n.key === part.key)
            this.props.partSelected(partFromModel ? partFromModel : {})
        } else {
            console.log('Illegal select', part)
        }
    }

    componentWillMount() {
        this.treeDef = go.GraphObject.make;  // for more concise visual tree definitions
        const nodeTemplate = createNodeTemplate(this.treeDef, this.onSelectionChanged.bind(this))
        this.myDiagramCreator = initDrawingBoard(this.treeDef, nodeTemplate)
    }

    componentDidMount() {
        const paletteNodeTemplate = createNodeTemplate(this.treeDef, () => { })
        if (!this.myPalette) this.myPalette = initPalette(this.treeDef, paletteNodeTemplate, this.props.palette)
    }

    save() {
        const { nodeDataArray, linkDataArray } = this.props.sketches[this.sketchId].model
        const saveObject = _.merge({}, { nodeDataArray, linkDataArray })
        this.props.projectSaved(saveObject, this.projectId, this.sketchId)
    }

    renderDrawingBoard() {
        return (
            <div id="board-container" style={boardContainerStyle}>
                <Card id="myPaletteDiv" style={paletteStyle}></Card>
                <div id="board-and-infobox" style={boardAndInfoStyle}>
                    <Card style={boardStyle}>
                        {
                            this.props.sketches[this.sketchId] ?
                                <GojsDiagram
                                    diagramId="myDiagramDiv"
                                    model={this.props.sketches[this.sketchId].model}
                                    createDiagram={this.myDiagramCreator}
                                    className="myDiagram"
                                    onModelChange={this.props.modelUpdated}
                                    linkFromPortIdProperty="fid"
                                    linkToPortIdProperty="tid"
                                /> :
                                <span>Loading sketch...</span>
                        }
                    </Card>
                    <div style={rightHandCards}>
                        <Card id="info-board" style={infoBoxStyle}>
                            <ResultBox partData={this.props.selectedPart} sketchId={this.sketchId} />
                        </Card>
                        <Card style={errorBoxStyle}>
                            <StatedErrorMessageBox />
                        </Card>
                    </div>
                </div>
                <Button onClick={this.save.bind(this)}>Save</Button>
            </div>
        )
    }

    handleChange = fieldName => value => {
        
    }

    renderValuesTabContent() {
        return (
            <TextField 
                id="targetPressure"
                label="Target Pressure"
                value={this.props.targetPressureValue}
                onChange={this.handleChange('targetPressure')}
            />
        )
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
                    <Tab label="resultTable" />

                </Tabs>
                    {displayTab === 0 && this.renderDrawingBoard.bind(this)()}
                    {displayTab === 1 && <p>Values here</p>}
                    {displayTab === 2 && <p>Result table here</p>}
            </div>
        )
    }
}

export default DrawingBoard