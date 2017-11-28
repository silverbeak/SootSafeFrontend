export const createNewProjectDialog = () => {
    return { type: 'CREATE_NEW_PROJECT_DIALOG' }
}

export const createNewSketchDialog = projectId => {
    return { type: 'CREATE_NEW_SKETCH_DIALOG', projectId }
}

export const dismissNewProjectDialog = () => {
    return { type: 'DISMISS_NEW_PROJECT_DIALOG' }
}

export const dismissNewSketchDialog = () => {
    return { type: 'DISMISS_NEW_SKETCH_DIALOG' }
}
