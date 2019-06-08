import React, { Component } from 'react'
import { StatedProjectList } from '../../components/projects/ProjectList'
import ReportList from '../../components/reports/ReportList'
import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import NewsPage from '../../components/misc/NewsPage';

const styles = {
    dashboard: {
        display: 'flex',
        flexDirection: 'row',
    },
    dashboardItem: {
        margin: '1em',
        padding: '1em',
        flex: 1,
        maxHeight: '20em',
    }
}

class UserDashboard extends Component {
    render() {
        const { classes } = this.props

        return (
            <div className={classes.dashboard}>
                <Paper className={classes.dashboardItem}>
                    <StatedProjectList />
                </Paper>

                <Paper className={classes.dashboardItem}>
                    <ReportList {...this.props} />
                </Paper>

                <Paper className={classes.dashboardItem}>
                    <NewsPage />
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(UserDashboard)