import React, { Component } from 'react';
import { ListItem, ListItemText, List, ListSubheader } from '@material-ui/core'
import * as _ from 'lodash'

class ReportList extends Component {
    render() {
        const reports = [
            'Project A - Floor 1',
            'Project A - Floor 2',
            'Project A - Roof',
            'Project B - Basement',
            'Project C - Main building'
        ]

        const singleReport = reportName => {
            return (
                <ListItem
                    button
                    key={reportName}
                >
                    <ListItemText inset primary={reportName} />
                </ListItem>
            )
        }

        const items = _.map(reports, singleReport)

        return (
            <div>
                <List subheader={<ListSubheader>My reports</ListSubheader>} >
                    {items}
                </List>
            </div>
        );
    }
}

export default ReportList;