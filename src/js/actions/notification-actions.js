const defaultParameters = {}

export const showNotification = (notification, parameters = defaultParameters) => {
    return {
        type: 'NOTIFICATION',
        notification,
        parameters
    }
}

export const acknowledgeNotification = notificationId => {
    return { type: 'ACKNOWLEDGE_NOTIFICATION', notificationId }
}
