import * as _ from '../../../node_modules/lodash/lodash.min.js'
import { defaultMerge } from './component-field-index'

const initialPalette = [
    { id: 1, name: 'default', data: 
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
    [
        {
            ssPartName: 'outlet',
            key: 1,
            geo: "F1 M0 0 L20 0 20 20 0 20z",
            ports: [
                { id: "U6", spot: "0.5 0 0 0.5" },
                { id: "U2", spot: "0.5 1 0 -0.5" }
            ],
            fill: "rgba(128, 0, 128, 0.5)"
        },
        {
            ssPartName: 'fireCell',
            key: 3,
            angle: 90,
            geo: "F1 M0 0 L20 0 20 20 0 20z",
            ports: [
                { id: "U6", spot: "0.5 0 0 0.5" },
                { id: "U2", spot: "0.5 1 0 -0.5" }
            ]
        },
        {
            ssPartName: 'pipe',
            key: 5,
            geo: "F1 M0 0 L20 0 20 60 0 60z",
            ports: [
                { id: "U6", spot: "0.5 0 0 0.5" },
                { id: "U2", spot: "0.5 1 0 -0.5" }
            ]
        },
        {
            ssPartName: 'pipe',
            key: 7,
            angle: 90,
            geo: "F1 M0 0 L20 0 20 60 0 60z",
            ports: [
                { id: "U6", spot: "0.5 0 0 0.5" },
                { id: "U2", spot: "0.5 1 0 -0.5" }
            ]
        },
        {
            ssPartName: 'bend',
            key: 11,
            geo: "F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z",
            ports: [
                { id: "U0", spot: "1 0.25 -0.5 0.25" },
                { id: "U2", spot: "0.25 1 0.25 -0.5" }
            ]
        },
        {
            ssPartName: 'bend',
            key: 12,
            angle: 90,
            geo: "F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z",
            ports: [
                { id: "U0", spot: "1 0.25 -0.5 0.25" },
                { id: "U2", spot: "0.25 1 0.25 -0.5" }
            ]
        },
        {
            ssPartName: 'bend',
            key: 13,
            angle: 180,
            geo: "F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z",
            ports: [
                { id: "U0", spot: "1 0.25 -0.5 0.25" },
                { id: "U2", spot: "0.25 1 0.25 -0.5" }
            ]
        },
        {
            ssPartName: 'bend',
            key: 14,
            angle: 270,
            geo: "F1 M0 40 L0 30 Q0 0 30 0 L40 0 40 20 30 20 Q20 20 20 30 L20 40z",
            ports: [
                { id: "U0", spot: "1 0.25 -0.5 0.25" },
                { id: "U2", spot: "0.25 1 0.25 -0.5" }
            ]
        },
        {
            ssPartName: 'tpipe',
            key: 21,
            geo: "F1 M0 0 L60 0 60 20 50 20 Q40 20 40 30 L40 40 20 40 20 30 Q20 20 10 20 L0 20z",
            ports: [
                { id: "U0", spot: "1 0.25 -0.5 0.25" },
                { id: "U4", spot: "0 0.25 0.5 0.25" },
                { id: "U2", spot: "0.5 1 0 -0.5" }
            ]
        },
        {
            ssPartName: 'tpipe',
            key: 22,
            angle: 90,
            geo: "F1 M0 0 L60 0 60 20 50 20 Q40 20 40 30 L40 40 20 40 20 30 Q20 20 10 20 L0 20z",
            ports: [
                { id: "U0", spot: "1 0.25 -0.5 0.25" },
                { id: "U4", spot: "0 0.25 0.5 0.25" },
                { id: "U2", spot: "0.5 1 0 -0.5" }
            ]
        },
        {
            ssPartName: 'tpipe',
            key: 23,
            angle: 180,
            geo: "F1 M0 0 L60 0 60 20 50 20 Q40 20 40 30 L40 40 20 40 20 30 Q20 20 10 20 L0 20z",
            ports: [
                { id: "U0", spot: "1 0.25 -0.5 0.25" },
                { id: "U4", spot: "0 0.25 0.5 0.25" },
                { id: "U2", spot: "0.5 1 0 -0.5" }
            ]
        },
        {
            ssPartName: 'tpipe',
            key: 24,
            angle: 270,
            geo: "F1 M0 0 L60 0 60 20 50 20 Q40 20 40 30 L40 40 20 40 20 30 Q20 20 10 20 L0 20z",
            ports: [
                { id: "U0", spot: "1 0.25 -0.5 0.25" },
                { id: "U4", spot: "0 0.25 0.5 0.25" },
                { id: "U2", spot: "0.5 1 0 -0.5" }
            ]
        },

        // {
        //     key: 31,
        //     geo: "F1 M0 0 L20 0 20 10 Q20 14.142 22.929 17.071 L30 24.142 15.858 38.284 8.787 31.213 Q0 22.426 0 10z",
        //     ports: [
        //         { id: "U6", spot: "0 0 10.5 0.5" },
        //         { id: "U1", spot: "1 1 -7.571 -7.571", angle: 45 }
        //     ]
        // },
        // {
        //     key: 32, angle: 90,
        //     geo: "F1 M0 0 L20 0 20 10 Q20 14.142 22.929 17.071 L30 24.142 15.858 38.284 8.787 31.213 Q0 22.426 0 10z",
        //     ports: [
        //         { id: "U6", spot: "0 0 10.5 0.5" },
        //         { id: "U1", spot: "1 1 -7.571 -7.571", angle: 45 }
        //     ]
        // },
        // {
        //     key: 33, angle: 180,
        //     geo: "F1 M0 0 L20 0 20 10 Q20 14.142 22.929 17.071 L30 24.142 15.858 38.284 8.787 31.213 Q0 22.426 0 10z",
        //     ports: [
        //         { id: "U6", spot: "0 0 10.5 0.5" },
        //         { id: "U1", spot: "1 1 -7.571 -7.571", angle: 45 }
        //     ]
        // },
        // {
        //     key: 34, angle: 270,
        //     geo: "F1 M0 0 L20 0 20 10 Q20 14.142 22.929 17.071 L30 24.142 15.858 38.284 8.787 31.213 Q0 22.426 0 10z",
        //     ports: [
        //         { id: "U6", spot: "0 0 10.5 0.5" },
        //         { id: "U1", spot: "1 1 -7.571 -7.571", angle: 45 }
        //     ]
        // },
        // {
        //     key: 41,
        //     geo: "F1 M14.142 0 L28.284 14.142 14.142 28.284 0 14.142z",
        //     ports: [
        //         { id: "U1", spot: "1 1 -7.321 -7.321" },
        //         { id: "U3", spot: "0 1 7.321 -7.321" },
        //         { id: "U5", spot: "0 0 7.321 7.321" },
        //         { id: "U7", spot: "1 0 -7.321 7.321" }
        //     ]
        // },

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
    }
]

const palettes = function(state = initialPalette, action) {
    switch(action.type) {
        // case 'PALETTE_REQUESTED':
            // TODO: Return palette based on action.id
            // return state
        default: 
        if (state[0]) {
            const copy = _.merge({}, state)
            // const merged = defaultMerge(state[0].data)
            // copy[0].data = merged
            return copy
        } else {
            return state
        }
    }
}

export default palettes
