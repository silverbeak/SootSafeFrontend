const drawerWidth = 256;

export const mainStyle = theme => {
    return {
        root: {
            display: 'flex',
            minHeight: '100vh',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appContent: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        },
        mainContent: {
            flex: 1,
            padding: '48px 36px 0',
            background: '#eaeff1',
        },
        button: {
            margin: theme.spacing(1),
        },
        leftIcon: {
            marginRight: theme.spacing(1),
        },
        rightIcon: {
            marginLeft: theme.spacing(1),
        },
        iconSmall: {
            fontSize: 20,
        },
    }
}