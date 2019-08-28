import * as _ from '../../../node_modules/lodash/lodash.min.js'

const initialNotificationState = {
    notifications: [],
    displayGenericProgress: false,
}

const notifications = (state = initialNotificationState, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            const newNotificationCopy = [...state.notifications]
            newNotificationCopy.push({
                id: Math.random(), // Fix this. UUID will be good
                notification: action.notification,
                acknowledged: false
            })

            return Object.assign({}, state, { notifications: newNotificationCopy })

        case 'ACKNOWLEDGE_NOTIFICATION':
            console.log('New notification', action.notificationId)
            const ackCopy = [...state.notifications]
            const thisNotification = _.find(ackCopy, notification => notification.id === action.notificationId && !notification.acknowledged)

            if (!thisNotification) return state

            thisNotification.acknowledged = true

            return Object.assign({}, state, { notifications: ackCopy })

        case 'SHOW_GENERIC_PROGRESS':
            return Object.assign({}, state, { displayGenericProgress: true })

        case 'DISMISS_GENERIC_PROGRESS':
            return Object.assign({}, state, { displayGenericProgress: false })

        default:
    }

    return state
}

export default notifications