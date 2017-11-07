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

const targetCell = {
    targetCell: {
        type: Boolean,
        value: true,
        path: 'fields.targetCell'
    }
}

const mergeSingle = component => {
    switch(component.key) {
        case 1: 
        return _.merge({}, component, { type: AVAILABLE_TYPES.outlet }, { fields: _.merge({}, base, pressureLoss) })
        case 3:
        return _.merge({}, component, { type: AVAILABLE_TYPES.firecell }, { fields: _.merge({}, pressureLoss, targetCell) })
        case 5: 
        case 7:
        return _.merge({}, component, { type: AVAILABLE_TYPES.pipe }, { fields: _.merge({}, base, capacity, pressureLoss) })
        case 11:
        case 12:
        case 13:
        case 14:
        return _.merge({}, component, { type: AVAILABLE_TYPES.bend }, { fields: _.merge({}, base, capacity, pressureLoss) })
        case 21:
        case 22:
        case 23:
        case 24:
        return _.merge({}, component, { type: AVAILABLE_TYPES.tpipe }, { fields: _.merge({}, base, capacity, pressureLoss) })
        default:
        return component
    }
}

export const changeTypeByName = component => {
    const newComponent = _.merge({}, component)
    switch(component.type.name) {
        case 'outlet': 
        newComponent.type = AVAILABLE_TYPES.outlet
        newComponent.fields = _.merge({}, base, pressureLoss)
        break
        case 'firecell':
        newComponent.type = AVAILABLE_TYPES.firecell
        newComponent.fields = _.merge({}, pressureLoss, targetCell)
        break
        case 'pipe':
        newComponent.type = AVAILABLE_TYPES.pipe
        newComponent.fields = _.merge({}, base, capacity, pressureLoss)
        break
        case 'bend':
        newComponent.type = AVAILABLE_TYPES.bend
        newComponent.fields = _.merge({}, base, capacity, pressureLoss)
        break
        case 'tpipe':
        newComponent.type = AVAILABLE_TYPES.tpipe
        newComponent.fields = _.merge({}, base, capacity, pressureLoss)
        break
        case 'areaIncrement':
        newComponent.type = AVAILABLE_TYPES.areaIncrement
        newComponent.fields = _.merge({}, base)
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
    }
    return field
}

export const extendFieldsByName = fields => {
    const agg = _.reduce(fields, (aggregator, field, name) => {
        console.log('Logging here:', field)
        if (field.children) {
            aggregator[field.name] = {}
            aggregator[field.name].children = extendFieldsByName(field.children)
            aggregator[field.name].type = Object
        } else {
            _.mapValues(field, (f, name) => {
                aggregator[name] = extendSingleFieldByType(f)
             })
        }
        return aggregator
    }
    , {})
    return agg
}
