import React from 'react'
import { connect } from 'react-redux'
import { GroupingState, LocalGrouping } from '@devexpress/dx-react-grid'

import {
    Grid, TableView, TableHeaderRow, TableGroupRow
} from '@devexpress/dx-react-grid-material-ui'



class ResultTable extends React.Component {
    render() {

        const capitalizeFirstLetter = string => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        return (
            <Grid
                columns={this.props.mainTitles}
                rows={this.props.values}>
                <GroupingState
                    grouping={[{ columnName: 'componentid' }]}
                />
                <LocalGrouping />
                <TableView />
                <TableHeaderRow />
                <TableGroupRow />
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        mainTitles: [
            { name: 'componentid', title: 'Sträcka' },
            { name: 'state', title: 'Tillstånd' },
            { name: 'pressure', title: 'Tryck (Pa)' },
            { name: 'pressuredifference', title: 'Tryckskillnad (Pa)' },
            { name: 'flow', title: 'Flöde (l/s)' },
            { name: 'addedflow', title: 'Flödestillskott (l/s)' },
        ],
        values: [
            { id: 0, state: 'normal', componentid: 0, pressure: 0, pressuredifference: 22, flow: 17, addedflow: 0 },
            { id: 1, state: 'fire', componentid: 0, pressure: 1000, pressuredifference: 1000, flow: 115, addedflow: 0 },

            { id: 2, state: 'normal', componentid: 1, pressure: -22, pressuredifference: 2.4, flow: 34, addedflow: 17 },
            { id: 3, state: 'fire', componentid: 1, pressure: 0, pressuredifference: 27, flow: 115, addedflow: 0 },

            { id: 4, state: 'normal', componentid: 2, pressure: -24.4, pressuredifference: 3.1, flow: 51, addedflow: 17 },
            { id: 5, state: 'fire', componentid: 2, pressure: -27, pressuredifference: 21, flow: 133, addedflow: 18 },

            { id: 6, state: 'normal', componentid: 3, pressure: -27.5, pressuredifference: 11.6, flow: 68, addedflow: 17 },
            { id: 7, state: 'fire', componentid: 3, pressure: -48, pressuredifference: 60, flow: 155, addedflow: 22 },

            { id: 8, state: 'normal', componentid: 4, pressure: -39.1, pressuredifference: 22.5, flow: 84, addedflow: 88 },
            { id: 9, state: 'fire', componentid: 4, pressure: -108, pressuredifference: 84, flow: 156, addedflow: 146 },
        ]
    }
}

export const StatedResultTable = connect(mapStateToProps)(ResultTable)

export default ResultTable