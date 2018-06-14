import go from 'gojs'
import SnappingTool from './snapping-tool'

export const initDrawingBoard = (treeDefinition, nodeTemplate) => diagramElementId => {
    const $ = treeDefinition
    const myDiagram = $(go.Diagram, diagramElementId, {
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
    
    myDiagram.nodeTemplate.contextMenu = $(go.Adornment, "Vertical",
        $("ContextMenuButton",
        $(go.TextBlock, "Rotate +45"),
        { click: function(e, obj) { rotate(obj.part.adornedPart, 45); } }),
        $("ContextMenuButton",
        $(go.TextBlock, "Rotate -45"),
        { click: function(e, obj) { rotate(obj.part.adornedPart, -45); } }),
        $("ContextMenuButton",
        $(go.TextBlock, "Rotate 180"),
        { click: function(e, obj) { rotate(obj.part.adornedPart, 180); } }),
        $("ContextMenuButton",
        $(go.TextBlock, "Detach"),
        { click: function(e, obj) { detachSelection(); } }),
        $("ContextMenuButton",
        $(go.TextBlock, "Delete"),
        { click: function(e, obj) { e.diagram.commandHandler.deleteSelection(); } })
    );
    // Change the angle of the parts connected with the given node
    function rotate(node, angle) {
        var tool = myDiagram.toolManager.draggingTool;  // should be a SnappingTool
        myDiagram.startTransaction("rotate " + angle.toString());
        var sel = new go.Set(go.Node);
        sel.add(node);
        var coll = tool.computeEffectiveCollection(sel).toKeySet();
        var bounds = myDiagram.computePartsBounds(coll);
        var center = bounds.center;
        coll.each(function(n) {
            n.angle += angle;
            n.location = n.location.copy().subtract(center).rotate(angle).add(center);
        });
        myDiagram.commitTransaction("rotate " + angle.toString());
    }
    function detachSelection() {
        myDiagram.startTransaction("detach");
        var coll = new go.Set(go.Link);
        myDiagram.selection.each(function(node) {
            if (!(node instanceof go.Node)) return;
            node.linksConnected.each(function(link) {
                if (link.category !== "") return;  // ignore comments
                // ignore links to other selected nodes
                if (link.getOtherNode(node).isSelected) return;
                // disconnect this link
                coll.add(link);
            });
        });
        myDiagram.removeParts(coll, false);
        myDiagram.commitTransaction("detach");
    }
    
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
}