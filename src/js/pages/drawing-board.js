import React from 'react'
import go from 'gojs/release/go-debug'
import Card, { CardContent } from 'material-ui/Card'
import SnappingTool from '../gojs/snapping-tool'
import Button from 'material-ui/Button'
import { initDrawingBoard } from '../gojs/board-tool'
import { initPalette } from '../gojs/palette-tool'
import InfoBox from '../components/info-box'
import { StatedErrorMessageBox } from '../components/error-message-box'
import * as _ from '../../../node_modules/lodash/lodash.min.js'
import { createNodeTemplate } from '../gojs/node-template'

const boardStyle = {
    height: "45em",
    display: "flex",
    flex: "3 0 0"
}

const paletteStyle = {
    height: "160px",
    margin: ".4em"
}

const boardContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
}

const boardAndInfoStyle = {
    display: "flex",
    flexDirection: "row",
    paddingLeft: ".4em",
    paddingTop: ".4em"
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
        const { projectId, sketchId } = props
        this.sketchId = sketchId
        this.projectId = projectId
        this.state = { initiated: false }
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
            const partFromModel = _.find(this.sketch.model.nodeDataArray, n => n.key === part.key)
            this.props.partSelected(partFromModel ? partFromModel : {})
        } else {
            console.log('Illegal select', part)
        }
    }

    componentDidMount() {
        var $ = go.GraphObject.make;  // for more concise visual tree definitions
        const nodeTemplate = createNodeTemplate($, this.onSelectionChanged.bind(this))
        this.myDiagram = initDrawingBoard($, nodeTemplate)
        const paletteNodeTemplate = createNodeTemplate($, () => { })

        this.myPalette = initPalette($, paletteNodeTemplate, this.props.palette)

        this.myDiagram.addModelChangedListener(e => {
            if (e.isTransactionFinished) {
                const json = e.model.toIncrementalJson(e)
                this.props.modelUpdated(json, this.sketchId)
            }
        })

        this.myDiagram.addDiagramListener('SelectionDeleted', () => { this.props.partSelected({}) })
        this.myDiagram.addDiagramListener('BackgroundSingleClicked', () => { this.props.partSelected({}) })
    }

    save() {
        // document.getElementById("mySavedModel").value = this.myDiagram.model.toJson();
        this.myDiagram.isModified = false;
        const saveObject = Object.assign({}, { nodeDataArray: this.myDiagram.model.nodeDataArray, linkDataArray: this.myDiagram.model.linkDataArray })
        this.props.projectSaved(saveObject, this.projectId, this.sketchId)
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.initiated && (nextProps.projectId !== this.projectId || nextProps.sketchId !== this.sketchId)) {
            const { projectId, sketchId } = nextProps
            this.sketchId = sketchId
            this.projectId = projectId
            this.setState({ initiated: false })
            this.props.requestProjectLoad(nextProps.projectId, nextProps.sketchId)
        }

        if (!this.state.initiated && nextProps.sketches[this.sketchId]) {
            this.setState({ initiated: true })

            this.sketch = nextProps.sketches[this.sketchId]

            this.myDiagram.model.applyIncrementalJson({
                class: "go.GraphLinksModel",
                incremental: 1,
                nodeKeyProperty: "key",
                linkKeyProperty: "key",
                modifiedNodeData: Object.assign({}, nextProps.sketches[this.sketchId].model.nodeDataArray),
                modifiedLinkData: nextProps.sketches[this.sketchId].model.linkDataArray
            })

            this.myDiagram.model = go.Model.fromJson(Object.assign({}, nextProps.sketches[this.sketchId].model))
        }
    }

    render() {
        return (
            <div id="board-container" style={boardContainerStyle}>
                <Card id="myPaletteDiv" style={paletteStyle}></Card>
                <div id="board-and-infobox" style={boardAndInfoStyle}>
                    <Card id="myDiagramDiv" style={boardStyle}></Card>
                    <div style={rightHandCards}>
                        <Card id="info-board" style={infoBoxStyle}>
                            <InfoBox partData={this.props.selectedPart} sketchId={this.sketchId} />
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
}

export default DrawingBoard