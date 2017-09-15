import React from 'react'
import go from 'gojs/release/go-debug'
import SnappingTool from '../gojs/snapping-tool'
import InfoBox from '../components/info-box.js'
import * as _ from '../../../node_modules/lodash/lodash.min.js'

const boardStyle = {
    border: "solid 1px black",
    height: "500px",
    display: "flex",
    flex: "3 0 0"
}

const paletteStyle = {
    border: "solid 1px black",
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
    border: "1px solid",
    flex: "1 0 0",
    marginLeft: ".4em",
    paddingLeft: ".4em",
    marginRight: ".4em",
    paddingRight: ".4em"
}

class DrawingBoard extends React.Component {
    
    initDrawingBoard(treeDefinition, nodeTemplate) {
        const $ = treeDefinition
        const myDiagram = $(go.Diagram, "myDiagramDiv", {
            initialScale: 1.5,
            "commandHandler.defaultScale": 1.5,
            allowDrop: true,  // accept drops from palette
            allowLink: false,  // no user-drawn links
            initialContentAlignment: go.Spot.Center,
            // use a custom DraggingTool instead of the standard one, defined below
            draggingTool: new SnappingTool(),
            "undoManager.isEnabled": true
        });
        
        // TODO: Det här kanske vi kan använda sen?
        // myDiagram.nodeTemplateMap.add("Comment",
        // $(go.Node,
        //     new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        //     $(go.TextBlock,
        //         { stroke: "brown", font: "9pt sans-serif" },
        //         new go.Binding("text"))
        //     )
        // );
        
        myDiagram.nodeTemplate = nodeTemplate,
        
        // myDiagram.nodeTemplate.contextMenu = $(go.Adornment, "Vertical",
        //     $("ContextMenuButton",
        //     $(go.TextBlock, "Rotate +45"),
        //     { click: function(e, obj) { rotate(obj.part.adornedPart, 45); } }),
        //     $("ContextMenuButton",
        //     $(go.TextBlock, "Rotate -45"),
        //     { click: function(e, obj) { rotate(obj.part.adornedPart, -45); } }),
        //     $("ContextMenuButton",
        //     $(go.TextBlock, "Rotate 180"),
        //     { click: function(e, obj) { rotate(obj.part.adornedPart, 180); } }),
        //     $("ContextMenuButton",
        //     $(go.TextBlock, "Detach"),
        //     { click: function(e, obj) { detachSelection(); } }),
        //     $("ContextMenuButton",
        //     $(go.TextBlock, "Delete"),
        //     { click: function(e, obj) { e.diagram.commandHandler.deleteSelection(); } })
        // );
        // // Change the angle of the parts connected with the given node
        // function rotate(node, angle) {
        //     var tool = myDiagram.toolManager.draggingTool;  // should be a SnappingTool
        //     myDiagram.startTransaction("rotate " + angle.toString());
        //     var sel = new go.Set(go.Node);
        //     sel.add(node);
        //     var coll = tool.computeEffectiveCollection(sel).toKeySet();
        //     var bounds = myDiagram.computePartsBounds(coll);
        //     var center = bounds.center;
        //     coll.each(function(n) {
        //         n.angle += angle;
        //         n.location = n.location.copy().subtract(center).rotate(angle).add(center);
        //     });
        //     myDiagram.commitTransaction("rotate " + angle.toString());
        // }
        // function detachSelection() {
        //     myDiagram.startTransaction("detach");
        //     var coll = new go.Set(go.Link);
        //     myDiagram.selection.each(function(node) {
        //         if (!(node instanceof go.Node)) return;
        //         node.linksConnected.each(function(link) {
        //             if (link.category !== "") return;  // ignore comments
        //             // ignore links to other selected nodes
        //             if (link.getOtherNode(node).isSelected) return;
        //             // disconnect this link
        //             coll.add(link);
        //         });
        //     });
        //     myDiagram.removeParts(coll, false);
        //     myDiagram.commitTransaction("detach");
        // }
        
        // no visual representation of any link data
        myDiagram.linkTemplate = $(go.Link, { visible: false });
        
        // // support optional links from comment nodes to pipe nodes
        // myDiagram.linkTemplateMap.add("Comment",
        // $(go.Link,
        //     { curve: go.Link.Bezier },
        //     $(go.Shape, { stroke: "brown", strokeWidth: 2 }),
        //     $(go.Shape, { toArrow: "OpenTriangle", stroke: "brown" })
        // ));
        // this model needs to know about particular ports
        myDiagram.model = $(go.GraphLinksModel, {
            copiesArrays: true,
            copiesArrayObjects: true,
            linkFromPortIdProperty: "fid",
            linkToPortIdProperty: "tid",
            linkKeyProperty: "key"
        });
        
        return myDiagram
    } // end init
    
    initPalette(treeDefinition, nodeTemplate, nodeDataArray) {
        // Make sure the pipes are ordered by their key in the palette inventory
        function keyCompare(a, b) {
            var at = a.data.key;
            var bt = b.data.key;
            if (at < bt) return -1;
            if (at > bt) return 1;
            return 0;
        }
        
        const $ = treeDefinition
        const myPalette = $(go.Palette, "myPaletteDiv", {
            initialScale: 1.2,
            contentAlignment: go.Spot.Center,
            nodeTemplate: nodeTemplate,  // shared with the main Diagram
            "contextMenuTool.isEnabled": false,
            layout: $(go.GridLayout, {
                cellSize: new go.Size(1, 1), spacing: new go.Size(5, 5),
                wrappingColumn: 12, comparer: keyCompare
            }),
            // initialize the Palette with a few "pipe" nodes
            model: $(go.GraphLinksModel, {
                copiesArrays: true,
                copiesArrayObjects: true,
                linkFromPortIdProperty: "fid",
                linkToPortIdProperty: "tid",
                linkKeyProperty: "key",
                nodeDataArray: nodeDataArray
            })  // end model
        });  // end Palette
        return myPalette
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
            const partFromModel = _.find(this.props.model.nodeDataArray, n => n.key === part.key)
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
        this.myDiagram = this.initDrawingBoard($, nodeTemplate)
        const paletteNodeTemplate = this.createNodeTemplate($, () => {})
        
        this.myPalette = this.initPalette($, paletteNodeTemplate, this.props.palette)
        
        this.myDiagram.addModelChangedListener( e => {
            if (e.isTransactionFinished) {
                const json = e.model.toIncrementalJson(e)
                this.props.modelUpdated(json, 0)
            }
        })

        this.myDiagram.addDiagramListener('SelectionDeleted', () => { this.props.partSelected({})})
        this.myDiagram.addDiagramListener('BackgroundSingleClicked', () => { this.props.partSelected({})})

        this.myDiagram.model.applyIncrementalJson({
            class: "go.GraphLinksModel",
            incremental: 1,
            nodeKeyProperty: "key",
            linkKeyProperty: "key",
            modifiedNodeData: Object.assign({}, this.props.model.nodeDataArray),
            modifiedLinkData: this.props.model.linkDataArray
        })

        this.load()
    }
    
    save() {
        // document.getElementById("mySavedModel").value = this.myDiagram.model.toJson();
        console.log(this.myDiagram.model.toJson())
        this.myDiagram.isModified = false;
    }
    
    load() {
        this.myDiagram.model = go.Model.fromJson(Object.assign({}, this.props.model))
    }
    
    render() {
        return (
            <div id="board-container" style={boardContainerStyle}>
            <div id="myPaletteDiv" style={paletteStyle}></div>
            <div id="board-and-infobox" style={boardAndInfoStyle}>
            <div id="myDiagramDiv" style={boardStyle}></div>
            <div id="info-board" style={infoBoardStyle}>
            <InfoBox partData={this.props.selectedPart} />
            </div>
            </div>
            <button onClick={this.save.bind(this)}>Save</button>
            </div>
        )
    }
}

export default DrawingBoard