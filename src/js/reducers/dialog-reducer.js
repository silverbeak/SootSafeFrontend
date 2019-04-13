const dialogs = (state = {}, action) => {
    switch(action.type) {
        case 'CREATE_NEW_PROJECT_DIALOG':
            return Object.assign({}, state, { newProjectDialog: true })

        case 'CREATE_NEW_SKETCH_DIALOG':
            return Object.assign({}, state, { newSketchDialog: true, projectId: action.projectId })

        case 'DISMISS_NEW_PROJECT_DIALOG':
            return Object.assign({}, state, { newProjectDialog: false })

        case 'DISMISS_NEW_SKETCH_DIALOG':
            return Object.assign({}, state, { newSketchDialog: false })
        default:
    }

    return state
}

export default dialogs