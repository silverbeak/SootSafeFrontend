import go from 'gojs/release/go-debug.js'

export default class SnappingTool extends go.DraggingTool {
    // Define a custom DraggingTool
    constructor() {
        super()
        go.DraggingTool.call(this);
    }
    
    // This predicate checks to see if the ports can snap together.
    // The first letter of the port id should be "U", "F", or "M" to indicate which kinds of port may connect.
    // The second letter of the port id should be a digit to indicate which direction it may connect.
    // The ports also need to not already have any link connections and need to face opposite directions.
    compatiblePorts(p1, p2) {
        // already connected?
        var part1 = p1.part;
        var id1 = p1.portId;
        if (id1 === null || id1 === "") return false;
        if (part1.findLinksConnected(id1).filter(function(l) { return l.category === ""; }).count > 0) return false;
        var part2 = p2.part;
        var id2 = p2.portId;
        if (id2 === null || id2 === "") return false;
        if (part2.findLinksConnected(id2).filter(function(l) { return l.category === ""; }).count > 0) return false;
        // compatible fittings?
        if ((id1[0] === 'U' && id2[0] === 'U') ||
            (id1[0] === 'F' && id2[0] === 'M') ||
        (id1[0] === 'M' && id2[0] === 'F')) {
            // find their effective sides, after rotation
            var a1 = this.effectiveAngle(id1, part1.angle);
            var a2 = this.effectiveAngle(id2, part2.angle);
            // are they in opposite directions?
            if (a1-a2 === 180 || a1-a2 === -180) return true;
        }
        return false;
    };
    // At what angle can a port connect, adjusting for the node's rotation
    effectiveAngle(id, angle) {
        var dir = id[1];
        var a = 0;
        if (dir === '1') a = 45;
        else if (dir === '2') a = 90;
        else if (dir === '3') a = 135;
        else if (dir === '4') a = 180;
        else if (dir === '5') a = 225;
        else if (dir === '6') a = 270;
        else if (dir === '7') a = 315;
        a += angle;
        if (a < 0) a += 360;
        else if (a >= 360) a -= 360;
        return a;
    };
    // Override this method to find the offset such that a moving port can
    // be snapped to be coincident with a compatible stationary port,
    // then move all of the parts by that offset.
    /** @override */
    moveParts(parts, offset, check) {
        // when moving an actually copied collection of Parts, use the offset that was calculated during the drag
        if (this._snapOffset && this.isActive && this.diagram.lastInput.up && parts === this.copiedParts) {
            go.DraggingTool.prototype.moveParts.call(this, parts, this._snapOffset, check);
            this._snapOffset = undefined;
            return;
        }
        var commonOffset = offset;
        // find out if any snapping is desired for any Node being dragged
        var sit = parts.iterator;
        while (sit.next()) {
            var node = sit.key;
            if (!(node instanceof go.Node)) continue;
            var info = sit.value;
            var newloc = info.point.copy().add(offset);
            // now calculate snap point for this Node
            var snapoffset = newloc.copy().subtract(node.location);
            var nearbyports = null;
            var closestDistance = 20*20;  // don't bother taking sqrt
            var closestPort = null;
            var closestPortPt = null;
            var nodePort = null;
            var mit = node.ports;
            while (mit.next()) {
                var port = mit.value;
                if (node.findLinksConnected(port.portId).filter(function(l) { return l.category === ""; }).count > 0) continue;
                var portPt = port.getDocumentPoint(go.Spot.Center);
                portPt.add(snapoffset);  // where it would be without snapping
                if (nearbyports === null) {
                    // this collects the Nodes that intersect with the NODE's bounds,
                    // excluding nodes that are being dragged (i.e. in the PARTS collection)
                    var nearbyparts = this.diagram.findObjectsIn(node.actualBounds,
                        function(x) { return x.part; },
                        function(p) { return !parts.contains(p); },
                        true);
                        // gather a collection of GraphObjects that are stationary "ports" for this NODE
                        nearbyports = new go.Set(go.GraphObject);
                        nearbyparts.each(function(n) {
                            if (n instanceof go.Node) {
                                nearbyports.addAll(n.ports);
                            }
                        });
                    }
                    var pit = nearbyports.iterator;
                    while (pit.next()) {
                        var p = pit.value;
                        if (!this.compatiblePorts(port, p)) continue;
                        var ppt = p.getDocumentPoint(go.Spot.Center);
                        var d = ppt.distanceSquaredPoint(portPt);
                        if (d < closestDistance) {
                            closestDistance = d;
                            closestPort = p;
                            closestPortPt = ppt;
                            nodePort = port;
                        }
                    }
                }
                // found something to snap to!
                if (closestPort !== null) {
                    // move the node so that the compatible ports coincide
                    var noderelpt = nodePort.getDocumentPoint(go.Spot.Center).subtract(node.location);
                    var snappt = closestPortPt.copy().subtract(noderelpt);
                    // save the offset, to ensure everything moves together
                    commonOffset = snappt.subtract(newloc).add(offset);
                    // ignore any node.dragComputation function
                    // ignore any node.minLocation and node.maxLocation
                    break;
                }
            }
            // now do the standard movement with the single (perhaps snapped) offset
            this._snapOffset = commonOffset.copy();  // remember for mouse-up when copying
            go.DraggingTool.prototype.moveParts.call(this, parts, commonOffset, check);
        };
        // Establish links between snapped ports,
        // and remove obsolete links because their ports are no longer coincident.
        /** @override */
        doDropOnto(pt, obj) {
            go.DraggingTool.prototype.doDropOnto.call(this, pt, obj);
            var tool = this;
            // Need to iterate over all of the dropped nodes to see which ports happen to be snapped to stationary ports
            var coll = this.copiedParts || this.draggedParts;
            var it = coll.iterator;
            while (it.next()) {
                var node = it.key;
                if (!(node instanceof go.Node)) continue;
                // connect all snapped ports of this NODE (yes, there might be more than one) with links
                var pit = node.ports;
                while (pit.next()) {
                    var port = pit.value;
                    // maybe add a link -- see if the port is at another port that is compatible
                    var portPt = port.getDocumentPoint(go.Spot.Center);
                    if (!portPt.isReal()) continue;
                    var nearbyports =
                    this.diagram.findObjectsAt(portPt,
                        function(x) {  // some GraphObject at portPt
                            var o = x;
                            // walk up the chain of panels
                            while (o !== null && o.portId === null) o = o.panel;
                            return o;
                        },
                        function(p) {  // a "port" Panel
                        // the parent Node must not be in the dragged collection, and
                        // this port P must be compatible with the NODE's PORT
                        if (coll.contains(p.part)) return false;
                        var ppt = p.getDocumentPoint(go.Spot.Center);
                        if (portPt.distanceSquaredPoint(ppt) >= 0.25) return false;
                        return tool.compatiblePorts(port, p);
                    });
                    // did we find a compatible port?
                    var np = nearbyports.first();
                    if (np !== null) {
                        // connect the NODE's PORT with the other port found at the same point
                        this.diagram.toolManager.linkingTool.insertLink(node, port, np.part, np);
                    }
                }
            }
        };
        // Just move selected nodes when SHIFT moving, causing nodes to be unsnapped.
        // When SHIFTing, must disconnect all links that connect with nodes not being dragged.
        // Without SHIFT, move all nodes that are snapped to selected nodes, even indirectly.
        /** @override */
        computeEffectiveCollection(parts) {
            if (this.diagram.lastInput.shift) {
                var links = new go.Set(go.Link);
                var coll = go.DraggingTool.prototype.computeEffectiveCollection.call(this, parts);
                coll.iteratorKeys.each(function(node) {
                    // disconnect all links of this node that connect with stationary node
                    if (!(node instanceof go.Node)) return;
                    node.findLinksConnected().each(function(link) {
                        if (link.category !== "") return;
                        // see if this link connects with a node that is being dragged
                        var othernode = link.getOtherNode(node);
                        if (othernode !== null && !coll.contains(othernode)) {
                            links.add(link);  // remember for later deletion
                        }
                    });
                });
                // outside of nested loops we can actually delete the links
                links.each(function(l) { l.diagram.remove(l); });
                return coll;
            } else {
                var map = new go.Map(go.Part, Object);
                if (parts === null) return map;
                var tool = this;
                parts.iterator.each(function(n) {
                    tool.gatherConnecteds(map, n);
                });
                return map;
            }
        };
        // Find other attached nodes.
        gatherConnecteds(map, node) {
            if (!(node instanceof go.Node)) return;
            if (map.contains(node)) return;
            // record the original Node location, for relative positioning and for cancellation
            map.add(node, { point: node.location });
            // now recursively collect all connected Nodes and the Links to them
            var tool = this;
            node.findLinksConnected().each(function(link) {
                if (link.category !== "") return;  // ignore comment links
                map.add(link, { point: new go.Point() });
                tool.gatherConnecteds(map, link.getOtherNode(node));
            });
        };
        // end SnappingTool class
    }
    