const initialState = {
    projectId: 1
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