import * as _ from '../../../node_modules/lodash/lodash'

export const AVAILABLE_TYPES = {
    areaIncrement: { name: 'areaIncrement', label: 'Area Increment' },
    bend: { name: 'bend', label: 'Bend' },
    fireCell: { name: 'fireCell', label: 'Fire Cell' },
    outlet: { name: 'outlet', label: 'Outlet' },
    pipe: { name: 'pipe', label: 'Pipe' },
    tpipe: { name: 'tpipe', label: 'T-Pipe' },
    box: { name: 'box', label: 'Låda' },
}

export const SHAPE_TYPES = {
    circular: 'CIRCULAR',
    rectangular: 'RECTANGULAR'
}

export const defaultMerge = palette => {
    return _.map(palette, mergeSingle)
}

const dimension = {
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

const base = {
    comment: {
        type: String,
        value: '',
        path: 'fields.comment',
        unit: ''
    },
    label: {
        type: String,
        value: '',
        path: 'fields.label',
        unit: ''
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

const targetCell = {
    targetCell: {
        type: Boolean,
        value: true,
        path: 'fields.targetCell'
    }
}

export const mergeSingle = component => {
    switch(component.ssPartName) {
        case 'outlet':
        return _.merge({}, component, { type: AVAILABLE_TYPES.outlet }, { fields: _.merge({}, base, pressureLoss) })
        case 'fireCell':
        return _.merge({}, component, { type: AVAILABLE_TYPES.fireCell }, { fields: _.merge({}, base, pressureLoss, capacity, targetCell) })
        case 'pipe':
        return _.merge({}, component, { type: AVAILABLE_TYPES.pipe }, { fields: _.merge({}, base, dimension, capacity, pressureLoss) })
        case 'bend':
        return _.merge({}, component, { type: AVAILABLE_TYPES.bend }, { fields: _.merge({}, base, dimension, capacity, pressureLoss) })
        case 'tpipe':
        return _.merge({}, component, { type: AVAILABLE_TYPES.tpipe }, { fields: _.merge({}, base, dimension, capacity, pressureLoss) })
        case 'areaIncrement':
        return _.merge({}, component, { type: AVAILABLE_TYPES.areaIncrement }, { fields: _.merge({}, base, dimension, capacity, pressureLoss) })
        default:
        return component
    }
}

export const changeTypeByName = component => {
    const newComponent = _.merge({}, component)
    switch(component.type.name) {
        case 'outlet': 
        newComponent.type = AVAILABLE_TYPES.outlet
        newComponent.fields = _.merge({}, base)
        break
        case 'fireCell':
        newComponent.type = AVAILABLE_TYPES.fireCell
        newComponent.fields = _.merge({}, base, pressureLoss, capacity, targetCell)
        break
        case 'pipe':
        newComponent.type = AVAILABLE_TYPES.pipe
        newComponent.fields = _.merge({}, base, dimension, capacity, pressureLoss)
        break
        case 'bend':
        newComponent.type = AVAILABLE_TYPES.bend
        newComponent.fields = _.merge({}, base, dimension, capacity, pressureLoss)
        break
        case 'tpipe':
        newComponent.type = AVAILABLE_TYPES.tpipe
        newComponent.fields = _.merge({}, base, dimension, capacity, pressureLoss)
        break
        case 'areaIncrement':
        newComponent.type = AVAILABLE_TYPES.areaIncrement
        newComponent.fields = _.merge({}, base, dimension, capacity, pressureLoss)
        break
        case 'box':
        newComponent.type = AVAILABLE_TYPES.box
        newComponent.fields = _.merge({}, base, dimension, capacity, pressureLoss)
        break
        default:
        throw new Error("Bad component: " + component.type.name)
    }
    return newComponent
}

const extendSingleFieldByType = (field, name) => {
    switch(field.type) {
        case 'Number': 
        field.type = Number
        break
        case 'String':
        field.type = String
        break
        case 'Boolean':
        field.type = Boolean
        break
        default:
        field.type = Number
    }
    return field
}

export const extendFieldsByName = fields => {
    const agg = _.reduce(fields, (aggregator, field, name) => {
        if (field.children) {
            aggregator[field.name] = {}
            aggregator[field.name].children = extendFieldsByName(field.children)
            aggregator[field.name].type = Object
            aggregator[field.name].name = name
        } else {
            aggregator[name] = extendSingleFieldByType(field)
        }
        return aggregator
    }
    , {})
    return agg
}
