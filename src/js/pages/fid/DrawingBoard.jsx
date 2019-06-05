import React from 'react'
import go from 'gojs'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import { initDrawingBoard } from '../../gojs/board-tool'
import { initPalette } from '../../gojs/palette-tool'
import ResultBox from '../../components/ResultBox'
import { StatedErrorMessageBox } from '../../components/error-message-box'
import { createNodeTemplate } from '../../gojs/node-template'
import { GojsDiagram } from 'react-gojs'
import { TextField } from '@material-ui/core';

const columnStyle = {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignContent: 'stretch'
}

const boardContainerStyle = {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignContent: 'stretch'
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

class DrawingBoard extends React.Component {

    constructor(props) {
        super(props)
        const { projectId, sketchId } = this.props
        this.state = { projectId, sketchId}
    }

    initiateDiagramCreator = () => {
        this.treeDef = go.GraphObject.make;  // for more concise visual tree definitions
        const nodeTemplate = createNodeTemplate(this.treeDef, this.props.partSelected)
        this.myDiagramCreator = initDrawingBoard(this.treeDef, nodeTemplate)
    }

    componentWillMount() {        
        this.initiateDiagramCreator()
    }

    componentDidUpdate() {
        const { sketchId, projectId } = this.props

        if (sketchId !== this.state.sketchId || projectId !== this.state.projectId) {
            this.setState({ projectId, sketchId})
            this.initiateDiagramCreator()
        }
    }

    componentDidMount() {
        const paletteNodeTemplate = createNodeTemplate(this.treeDef, () => { })
        if (!this.myPalette) this.myPalette = initPalette(this.treeDef, paletteNodeTemplate, this.props.palette)
    }

    save() {
        const { nodeDataArray, linkDataArray, metadata } = this.props.sketch.model
        const saveObject = Object.assign({}, { nodeDataArray, linkDataArray, metadata })
        this.props.projectSaved(saveObject, this.props.projectId, this.props.sketchId)
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

    render() {
        return (
            <div style={columnStyle}>
                <div id="board-container" style={boardContainerStyle}>
                    <Card id="myPaletteDiv" style={paletteStyle}></Card>
                    <div id="board-and-infobox" style={boardAndInfoStyle}>
                        <Card style={boardStyle}>
                            {
                                this.props.sketch ?
                                    <GojsDiagram
                                        diagramId="myDiagramDiv"
                                        model={this.props.sketch.model}
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
                                <ResultBox partData={this.props.selectedPart} sketchId={this.props.sketchId} />
                            </Card>
                            <Card style={errorBoxStyle}>
                                <StatedErrorMessageBox />
                            </Card>
                        </div>
                    </div>
                </div>
                <Button onClick={this.save.bind(this)}>Save</Button>
            </div>
        )
    }
}

export default DrawingBoard