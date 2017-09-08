import React from 'react'
import go from 'gojs/release/go-debug'
import SnappingTool from '../gojs/snapping-tool'
import * as _ from 'lodash'
import InfoBox from '../components/info-box.js'

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
    
    initDrawingBoard(treeDefinition, onSelectionChanged) {
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
        
        // Define the generic "pipe" Node.
        // The Shape gets it Geometry from a geometry path string in the bound data.
        // This node also gets all of its ports from an array of port data in the bound data.
        myDiagram.nodeTemplate = $(go.Node, 
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
        // Show different kinds of port fittings by using different shapes in this Binding converter
        function portFigure(pid) {
            if (pid === null || pid === "") return "XLine";
            if (pid[0] === 'F') return "CircleLine";
            if (pid[0] === 'M') return "PlusLine";
            return "XLine";  // including when the first character is 'U'
        }
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
            linkToPortIdProperty: "tid"
        });
        
        return myDiagram
    } // end init
    
    initPalette(treeDefinition, myDiagram) {
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
            nodeTemplate: myDiagram.nodeTemplate,  // shared with the main Diagram
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
                
                
                // Several different kinds of pipe objects, some already rotated for convenience.
                // Each "glue point" is implemented by a port.
                // The port's identifier's first letter must be the type of connector or "fitting".
                // The port's identifier's second letter must be indicate the direction in which a
                // connection may be made: 0-7, indicating multiples of 45-degree angles starting at zero.
                // If you want more than one port of a particular type in the same direction,
                // you will need to add a suffix to the port identifier.
                // The Spot determines the approximate location of the port on the shape.
                // The exact position is offset in order to account for the thickness of the stroke.
                // Each should be shifted towards the center of the shape by the fraction of its
                // distance from the center times the stroke thickness.
                // The following offsets assume the strokeWidth == 1.
                nodeDataArray: [
                    {
                        key: 1,
                        comment: 'Shape 1',
                        geo: "F1 M0 0 L20 0 20 20 0 20z",
                        ports: [
                            { id: "U6", spot: "0.5 0 0 0.5" },
                            { id: "U2", spot: "0.5 1 0 -0.5" }
                        ],
                        fill: "rgba(128, 0, 128, 0.5)"
                    },
                    {
                        key: 3, angle: 90,
                        geo: "F1 M0 0 L20 0 20 20 0 20z",
                        ports: [
                            { id: "U6", spot: "0.5 0 0 0.5" },
                            { id: "U2", spot: "0.5 1 0 -0.5" }
                        ]
                    },
                    {
                        key: 5,
                        geo: "F1 M0 0 L20 0 20 60 0 60z",
                        ports: [
                            { id: "U6", spot: "0.5 0 0 0.5" },
                            { id: "U2", spot: "0.5 1 0 -0.5" }
                        ]
                    },
                    {
                        key: 7, angle: 90,
                        geo: "F1 M0 0 L20 0 20 60 0 60z",
                        ports: [
                            { id: "U6", spot: "0.5 0 0 0.5" },
                            { id: "U2", spot: "0.5 1 0 -0.5" }
                        ]
                    },
                    {
                        key: 11,
                        geo: "F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z",
                        ports: [
                            { id: "U0", spot: "1 0.25 -0.5 0.25" },
                            { id: "U2", spot: "0.25 1 0.25 -0.5" }
                        ]
                    },
                    {
                        key: 12, angle: 90,
                        geo: "F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z",
                        ports: [
                            { id: "U0", spot: "1 0.25 -0.5 0.25" },
                            { id: "U2", spot: "0.25 1 0.25 -0.5" }
                        ]
                    },
                    {
                        key: 13, angle: 180,
                        geo: "F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z",
                        ports: [
                            { id: "U0", spot: "1 0.25 -0.5 0.25" },
                            { id: "U2", spot: "0.25 1 0.25 -0.5" }
                        ]
                    },
                    {
                        key: 14, angle: 270,
                        geo: "F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z",
                        ports: [
                            { id: "U0", spot: "1 0.25 -0.5 0.25" },
                            { id: "U2", spot: "0.25 1 0.25 -0.5" }
                        ]
                    },
                    {
                        key: 21,
                        geo: "F1 M0 0 L60 0 60 20 50 20 Q40 20 40 30 L40 40 20 40 20 30 Q20 20 10 20 L0 20z",
                        ports: [
                            { id: "U0", spot: "1 0.25 -0.5 0.25" },
                            { id: "U4", spot: "0 0.25 0.5 0.25" },
                            { id: "U2", spot: "0.5 1 0 -0.5" }
                        ]
                    },
                    {
                        key: 22, angle: 90,
                        geo: "F1 M0 0 L60 0 60 20 50 20 Q40 20 40 30 L40 40 20 40 20 30 Q20 20 10 20 L0 20z",
                        ports: [
                            { id: "U0", spot: "1 0.25 -0.5 0.25" },
                            { id: "U4", spot: "0 0.25 0.5 0.25" },
                            { id: "U2", spot: "0.5 1 0 -0.5" }
                        ]
                    },
                    {
                        key: 23, angle: 180,
                        geo: "F1 M0 0 L60 0 60 20 50 20 Q40 20 40 30 L40 40 20 40 20 30 Q20 20 10 20 L0 20z",
                        ports: [
                            { id: "U0", spot: "1 0.25 -0.5 0.25" },
                            { id: "U4", spot: "0 0.25 0.5 0.25" },
                            { id: "U2", spot: "0.5 1 0 -0.5" }
                        ]
                    },
                    {
                        key: 24, angle: 270,
                        geo: "F1 M0 0 L60 0 60 20 50 20 Q40 20 40 30 L40 40 20 40 20 30 Q20 20 10 20 L0 20z",
                        ports: [
                            { id: "U0", spot: "1 0.25 -0.5 0.25" },
                            { id: "U4", spot: "0 0.25 0.5 0.25" },
                            { id: "U2", spot: "0.5 1 0 -0.5" }
                        ]
                    },
                    {
                        key: 31,
                        geo: "F1 M0 0 L20 0 20 10 Q20 14.142 22.929 17.071 L30 24.142 15.858 38.284 8.787 31.213 Q0 22.426 0 10z",
                        ports: [
                            { id: "U6", spot: "0 0 10.5 0.5" },
                            { id: "U1", spot: "1 1 -7.571 -7.571", angle: 45 }
                        ]
                    },
                    {
                        key: 32, angle: 90,
                        geo: "F1 M0 0 L20 0 20 10 Q20 14.142 22.929 17.071 L30 24.142 15.858 38.284 8.787 31.213 Q0 22.426 0 10z",
                        ports: [
                            { id: "U6", spot: "0 0 10.5 0.5" },
                            { id: "U1", spot: "1 1 -7.571 -7.571", angle: 45 }
                        ]
                    },
                    {
                        key: 33, angle: 180,
                        geo: "F1 M0 0 L20 0 20 10 Q20 14.142 22.929 17.071 L30 24.142 15.858 38.284 8.787 31.213 Q0 22.426 0 10z",
                        ports: [
                            { id: "U6", spot: "0 0 10.5 0.5" },
                            { id: "U1", spot: "1 1 -7.571 -7.571", angle: 45 }
                        ]
                    },
                    {
                        key: 34, angle: 270,
                        geo: "F1 M0 0 L20 0 20 10 Q20 14.142 22.929 17.071 L30 24.142 15.858 38.284 8.787 31.213 Q0 22.426 0 10z",
                        ports: [
                            { id: "U6", spot: "0 0 10.5 0.5" },
                            { id: "U1", spot: "1 1 -7.571 -7.571", angle: 45 }
                        ]
                    },
                    {
                        key: 41,
                        geo: "F1 M14.142 0 L28.284 14.142 14.142 28.284 0 14.142z",
                        ports: [
                            { id: "U1", spot: "1 1 -7.321 -7.321" },
                            { id: "U3", spot: "0 1 7.321 -7.321" },
                            { id: "U5", spot: "0 0 7.321 7.321" },
                            { id: "U7", spot: "1 0 -7.321 7.321" }
                        ]
                    },
                    // Example M-F connector pipes
                    /*
                    {
                        key: 107, //angle: 90,
                        geo: "F1 M0 0 L5 0, 5 10, 15 10, 15 0, 20 0, 20 40, 0 40z",
                        ports: [
                            { id: "F6", spot: "0.5 0 0 10.5" },
                            { id: "U2", spot: "0.5 1 0 -0.5" }
                        ]
                    },
                    {
                        key: 108, //angle: 90,
                        geo: "F1 M0 0, 20 0, 20 30, 15 30, 15 40, 5 40, 5 30, 0 30z",
                        ports: [
                            { id: "U6", spot: "0.5 0 0 10.5" },
                            { id: "M2", spot: "0.5 1 0 -0.5" }
                        ]
                    }
                    */
                ]  // end nodeDataArray
            })  // end model
        });  // end Palette
        return myPalette
    }
    
    onSelectionChanged(part) {
        this.props.partSelected(part.data)
    }

    newPartDropped(event) {
        console.log('Diagram has new part', event.diagram.model.toJson())
    }
    
    componentDidMount() {
        var $ = go.GraphObject.make;  // for more concise visual tree definitions
        this.myDiagram = this.initDrawingBoard($, this.onSelectionChanged.bind(this))
        this.myPalette = this.initPalette($, this.myDiagram)
        const that = this
        this.myDiagram.addDiagramListener("ExternalObjectsDropped", this.newPartDropped)
    }
    
    save() {
        // document.getElementById("mySavedModel").value = this.myDiagram.model.toJson();
        console.log(this.myDiagram.model.toJson())
        this.myDiagram.isModified = false;
    }
    
    load() {
        // this.myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
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