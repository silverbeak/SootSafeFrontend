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

export const displayGenericProgress = parameters => {
    return {
        type: 'SHOW_GENERIC_PROGRESS',
        parameters,
    }
}

export const dismissGenericProgress = () => {
    return {
        type: 'DISMISS_GENERIC_PROGRESS'
    }
}
