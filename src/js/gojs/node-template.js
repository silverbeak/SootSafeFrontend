import go from 'gojs'

export const createNodeTemplate = (treeDefinition, onSelectionChanged) => {
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
            linkConnected: function (node, link, port) {
                if (link.category === "") port.visible = false;
            },
            linkDisconnected: function (node, link, port) {
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
        new go.Binding("layerName", "isSelected", function (s) { return s ? "Foreground" : ""; }).ofObject(),
        $(go.Shape, {
            name: "SHAPE",
            // the following are default values;
            // actual values may come from the node data object via data binding
            geometryString: "F1 M0 0 L40 0 20 20 0 20 z",
            fill: "rgba(128, 128, 128, 0.5)"
        },
            // this determines the actual shape of the Shape
            new go.Binding("geometryString", "geo"),
            // selection causes the stroke to be blue instead of black
            new go.Binding("stroke", "isSelected", function (s) { return s ? "#ee4b28" : "black"; }).ofObject())
    );
}
