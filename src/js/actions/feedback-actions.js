import { storeUserFeedback } from './firebase-actions'

export const submitUserFeedback = feedback => {

    return (dispatch, getState) => {
        
        const { displayName, email, uid } = getState().users.user

        const user = {
            displayName,
            email,
            uid
        }

        dispatch(storeUserFeedback(feedback, user))

        return {
            type: 'SUBMIT_FEEDBACK',
            feedback,
            user
        }
    }
}

export const toggleFeedbackDialog = show => {
    return {
        type: 'TOGGLE_FEEDBACK_DIALOG',
        show
    }
}
