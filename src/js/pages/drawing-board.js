import React from 'react'
import go from 'gojs/release/go-debug'
import Card, { CardContent } from 'material-ui/Card'
import SnappingTool from '../gojs/snapping-tool'
import { initDrawingBoard } from '../gojs/board-tool'
import { initPalette } from '../gojs/palette-tool'
import InfoBox from '../components/info-box.js'
import * as _ from '../../../node_modules/lodash/lodash.min.js'

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

const infoBoardStyle = {
    display: "flex",
    flex: "1 0 0",
    marginLeft: ".4em",
    paddingLeft: ".4em",
    marginRight: ".4em",
    paddingRight: ".4em"
}

class DrawingBoard extends React.Component {

    constructor(props) {
        super(props)
        const { projectId, sketchId } = props.urlParams
        this.sketchId = sketchId
        this.projectId = projectId
        this.initiated = false
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
    
    createNodeTemplate(treeDefinition, onSelectionChanged) {
        const $ = treeDefinition
        
        // Show different kinds of port fittings by using different shapes in this Binding converter
        function portFigure(pid) {
            if (pid === null || pid === "") return "XLine";
            if (pid[0] === 'F') return "CircleLine";
            if (pid[0] === 'M') return "PlusLine";
            return "XLine";  // including when the first character is 'U'
        }
        
        // Define the generic "pipe" Node.
        // The Shape gets it Geometry from a geometry path string in the bound data.
        // This node also gets all of its ports from an array of port data in the bound data.
        return $(go.Node, 
            "Spot", {
                locationObjectName: "SHAPE",
                locationSpot: go.Spot.Center,
                selectionAdorned: false,  // use a Binding on the Shape.stroke to show selection
                selectionChanged: onSelectionChanged,
                // each port is an "X" shape whose alignment spot and port ID are given by the item data
                itemTemplate: $(go.Panel,
                    new go.Binding("portId", "id"),
                    new go.Binding("alignment", "spot", go.Spot.parse),
                    $(go.Shape, "XLine",
                    { width: 6, height: 6, background: "transparent", fill: null, stroke: "gray" },
                    new go.Binding("figure", "id", portFigure),  // portFigure converter is defined below
                    new go.Binding("angle", "angle"))
                ),
                // hide a port when it is connected
                linkConnected: function(node, link, port) {
                    if (link.category === "") port.visible = false;
                },
                linkDisconnected: function(node, link, port) {
                    if (link.category === "") port.visible = true;
                }
            },
            // this creates the variable number of ports for this Spot Panel, based on the data
            new go.Binding("itemArray", "ports"),
            // remember the location of this Node
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            // remember the angle of this Node
            new go.Binding("angle", "angle").makeTwoWay(),
            // move a selected part into the Foreground layer, so it isn't obscured by any non-selected parts
            new go.Binding("layerName", "isSelected", function(s) { return s ? "Foreground" : ""; }).ofObject(),
            $(go.Shape, {
                name: "SHAPE",
                // the following are default values;
                // actual values may come from the node data object via data binding
                geometryString: "F1 M0 0 L40 0 20 20 0 20 z",
                fill: "rgba(128, 128, 0, 0.5)"
            },
            // this determines the actual shape of the Shape
            new go.Binding("geometryString", "geo"),
            // selection causes the stroke to be blue instead of black
            new go.Binding("stroke", "isSelected", function(s) { return s ? "dodgerblue" : "black"; }).ofObject())
        );
    }
    
    componentDidMount() {
        var $ = go.GraphObject.make;  // for more concise visual tree definitions
        const nodeTemplate = this.createNodeTemplate($, this.onSelectionChanged.bind(this))
        this.myDiagram = initDrawingBoard($, nodeTemplate)
        const paletteNodeTemplate = this.createNodeTemplate($, () => {})
        
        this.myPalette = initPalette($, paletteNodeTemplate, this.props.palette)
        
        this.myDiagram.addModelChangedListener( e => {
            if (e.isTransactionFinished) {
                const json = e.model.toIncrementalJson(e)
                this.props.modelUpdated(json, this.sketchId)
            }
        })

        this.myDiagram.addDiagramListener('SelectionDeleted', () => { this.props.partSelected({})})
        this.myDiagram.addDiagramListener('BackgroundSingleClicked', () => { this.props.partSelected({})})
    }
    
    save() {
        // document.getElementById("mySavedModel").value = this.myDiagram.model.toJson();
        this.myDiagram.isModified = false;
        const saveObject = Object.assign({}, { nodeDataArray: this.myDiagram.model.nodeDataArray, linkDataArray: this.myDiagram.model.linkDataArray })
        this.props.projectSaved(saveObject, this.projectId, this.sketchId)
    }

    componentWillReceiveProps(nextProps) {
        if (!this.initiated && nextProps.sketches[this.sketchId]) {
            this.initiated = true
            
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
                    <Card id="info-board" style={infoBoardStyle}>
                        <InfoBox partData={this.props.selectedPart} sketchId={this.sketchId} />
                    </Card>
                </div>
                <button onClick={this.save.bind(this)}>Save</button>
            </div>
        )
    }
}

export default DrawingBoard