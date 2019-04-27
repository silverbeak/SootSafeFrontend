import * as actions from './action-types'

export const partSelected = part => {
    return {
        type: actions.PART_SELECTED,
        part
    }
}
