const initialState = {
    projectId: 1,
    drawings: [
        { id: 1, name: 'default', data: {} }
    ]
}

const projects = (state = initialState, action) => {
    switch(action.type) {
        case 'LOAD_PROJECT_REQUEST':
            return state
        case 'PROJECT_LOADED':
            return state
        default:
            return state
    }
}

export default projects