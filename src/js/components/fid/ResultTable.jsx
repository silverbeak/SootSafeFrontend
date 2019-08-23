import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

function mapStateToProps(state, ownProps) {
    console.log('SketchID', state, ownProps.sketchId)
    return {
        result: state.projects.sketches[ownProps.sketchId]
    };
}

const OptionalNumberCell = ({children}) => {

    return (
        <TableCell>
            {children.toFixed(2)}
        </TableCell>
    )
}

class ResultTable extends Component {

    createRowPair(entry) {
        return [
            <TableRow key={`${1}`}>
                <TableCell>{entry.key}</TableCell>
                <TableCell>{entry.pointRegularPressure}</TableCell>
                <OptionalNumberCell>{entry.pointFirePressure}</OptionalNumberCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{entry.addedRegularFlow}</TableCell>
                <OptionalNumberCell>{entry.addedFireFlow}</OptionalNumberCell>
            </TableRow>,
            <TableRow key={`${2}`}>
                <TableCell>{entry.key}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <OptionalNumberCell>{entry.regularPressureDifference}</OptionalNumberCell>
                <OptionalNumberCell>{entry.firePressureDifference}</OptionalNumberCell>
                <TableCell>{entry.aggregatedRegularFlow}</TableCell>
                <OptionalNumberCell>{entry.aggregatedFireFlow}</OptionalNumberCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
        ]
    }

    render() {
        if (!this.props.result || !this.props.result.calculationResult) {
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
                        this.props.result.calculationResult.entries.map(this.createRowPair)
                    }
                </TableBody>
            </Table>
        );
    }
}

export default connect(
    mapStateToProps,
)(ResultTable);