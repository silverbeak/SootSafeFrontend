import go from 'gojs'

export const initPalette = (treeDefinition, nodeTemplate, nodeDataArray) => {
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