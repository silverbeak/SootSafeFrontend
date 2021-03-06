import * as _ from 'lodash'

const flattenSingleField = (agg, field, name) => {
    switch (field.type) {
        case Object:
            agg[name] = {
                type: field.type.name,
                children: flattenFields(field.children),
                name
            }
            break
        default:
            const type = field.type.name ? field.type.name : String(field.type)
            agg[name] = _.assign({}, field, { type , value: String(field.value).toString() })
    }
    return agg
}

export const flattenFields = fields => {
    return _.reduce(fields, flattenSingleField, {})
}

export const flattenNodeFields = node => {
    if (node.fields) {
        const flattenedFields = flattenFields(node.fields)
        node.fields = flattenedFields
    }
}