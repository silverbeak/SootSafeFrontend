import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

function mapStateToProps(state, ownProps) {
    console.log('SketchID', state, ownProps.sketchId)
    return {
        result: state.projects.sketches[ownProps.sketchId]
    };
}

const OptionalNumberCell = ({ children }) => {

    return isNaN(children) ?
        <TableCell></TableCell>
        :
        <TableCell> {children.toFixed(2)} </TableCell>
}

class ResultTable extends Component {

    allIsNaN({ regularPressureDifference, firePressureDifference, aggregatedRegularFlow, aggregatedFireFlow }) {
        return _.every([
            regularPressureDifference,
            firePressureDifference,
            aggregatedRegularFlow,
            aggregatedFireFlow,
        ], isNaN)
    }

    createRowPair(entry) {

        const row1 = <TableRow key={`${1}`}>
            <TableCell>{entry.key}</TableCell>
            <TableCell>{entry.pointRegularPressure}</TableCell>
            <OptionalNumberCell>{entry.pointFirePressure}</OptionalNumberCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <OptionalNumberCell>{entry.addedRegularFlow}</OptionalNumberCell>
            <OptionalNumberCell>{entry.addedFireFlow}</OptionalNumberCell>
        </TableRow>

        // Only display the second row if it contains any values (i.e exclude if all values are NaN)
        const row2 = this.allIsNaN(entry) ? undefined
            :
            <TableRow key={`${2}`}>
                <TableCell>{entry.key}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <OptionalNumberCell>{entry.regularPressureDifference}</OptionalNumberCell>
                <OptionalNumberCell>{entry.firePressureDifference}</OptionalNumberCell>
                <OptionalNumberCell>{entry.aggregatedRegularFlow}</OptionalNumberCell>
                <OptionalNumberCell>{entry.aggregatedFireFlow}</OptionalNumberCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>

        return [row1, row2]
    }

    render() {
        if (!this.props.result || !this.props.result.calculationResult) {
            return <div>No data available</div>
        }

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell> {/* Empty cell */} </TableCell>
                        <TableCell colSpan={2}> Tryck (Pa) </TableCell>
                        <TableCell colSpan={2}> Tryckfall (Pa) </TableCell>
                        <TableCell colSpan={2}> Flöde (l/s) </TableCell>
                        <TableCell colSpan={2}> Flödestillskott (l/s) </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>Sträcka</TableCell>
                        <TableCell>Normal</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Normal</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Normal</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Normal</TableCell>
                        <TableCell>Brand</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        this.props.result.calculationResult.entries.map(this.createRowPair.bind(this))
                    }
                </TableBody>
            </Table>
        );
    }
}

export default connect(
    mapStateToProps,
)(ResultTable);