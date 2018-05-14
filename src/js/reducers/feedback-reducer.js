import _ from '../../../node_modules/lodash/lodash'

const initialFeedbackState = {
    showFeedbackDialog: false
}

const feedbacks = (state = initialFeedbackState, action) => {
    switch(action.type) {
        case 'TOGGLE_FEEDBACK_DIALOG':
            return _.merge({}, state, { showFeedbackDialog: action.show })

        case 'SUBMIT_FEEDBACK':
        default:
            return state
    }

}

export default feedbacks