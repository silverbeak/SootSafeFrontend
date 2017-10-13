export const saveProjectToDb = projectData => {
    return {
        type: 'SAVE_PROJECT',
        projectData
    }
}