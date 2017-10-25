import * as _ from '../../../node_modules/lodash/lodash'

export const AVAILABLE_TYPES = {
    areaIncrement: { name: 'areaIncrement', label: 'Area Increment' },
    bend: { name: 'bend', label: 'Bend' },
    firecell: { name: 'firecell', label: 'Fire Cell' },
    outlet: { name: 'outlet', label: 'Outlet' },
    pipe: { name: 'pipe', label: 'Pipe' },
    tpipe: { name: 'tpipe', label: 'T-Pipe' },
}

export const SHAPE_TYPES = {
    circular: 'CIRCULAR',
    rectangular: 'RECTANGULAR'
}

export const defaultMerge = palette => {
    return _.map(palette, mergeSingle)
}

const base = {
    comment: {
        type: String,
        value: '',
        path: 'fields.comment',
        unit: ''
    },
    name: {
        type: String,
        value: '',
        path: 'fields.name',
        unit: ''
    },
    dimension: {
        type: Object,
        children: {
            diameter: {
                type: Number,
                value: 1,
                path: 'fields.dimension.children.diameter',
                min: 1,
                unit: 'mm'
            },
            length: {
                type: Number,
                value: 1,
                path: 'fields.dimension.children.length',
                min: 1,
                unit: 'mm'
            }
        }
    }
}

const capacity = {
    capacity: {
        type: Number,
        value: 1,
        min: 1,
        path: 'fields.capacity',
        unit: 'l/s'
    }
}

const pressureLoss = {
    pressureLoss: {
        type: Number,
        value: 0,
        min: 0,
        path: 'fields.pressureLoss',
        unit: 'Pa'
    }
}

const mergeSingle = component => {
    switch(component.key) {
        case 1: 
        return Object.assign({}, component, { type: AVAILABLE_TYPES.outlet }, { fields: Object.assign({}, base, pressureLoss) })
        case 3:
        return Object.assign({}, component, { type: AVAILABLE_TYPES.firecell }, { fields: Object.assign({}, base) })
        case 5: 
        case 7:
        return Object.assign({}, component, { type: AVAILABLE_TYPES.pipe }, { fields: Object.assign({}, base, capacity, pressureLoss) })
        case 11:
        case 12:
        case 13:
        case 14:
        return Object.assign({}, component, { type: AVAILABLE_TYPES.bend }, { fields: Object.assign({}, base, capacity, pressureLoss) })
        case 21:
        case 22:
        case 23:
        case 24:
        return Object.assign({}, component, { type: AVAILABLE_TYPES.tpipe}, { fields: Object.assign({}, base, capacity, pressureLoss) })
        default:
        return component
    }
}

export const mergeByName = component => {
    switch(component.type.name) {
        case 'outlet': 
        return Object.assign({}, component, { type: AVAILABLE_TYPES.outlet }, { fields: Object.assign({}, base, pressureLoss) })
        case 'fireCell':
        return Object.assign({}, component, { type: AVAILABLE_TYPES.firecell }, { fields: Object.assign({}, base) })
        case 'pipe':
        return Object.assign({}, component, { type: AVAILABLE_TYPES.pipe }, { fields: Object.assign({}, base, capacity, pressureLoss) })
        case 'bend':
        return Object.assign({}, component, { type: AVAILABLE_TYPES.bend }, { fields: Object.assign({}, base, capacity, pressureLoss) })
        case 'tpipe':
        return Object.assign({}, component, { type: AVAILABLE_TYPES.tpipe}, { fields: Object.assign({}, base, capacity, pressureLoss) })
        case 'areaIncrement':
        return Object.assign({}, component, { type: AVAILABLE_TYPES.tpipe}, { fields: Object.assign({}, base) })
        default:
        return component
    }
}