import React from 'react'
import { connect } from 'react-redux'
import * as _ from '../../../node_modules/lodash/lodash.min'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'

class CalculatedResultsBox extends React.Component {

    mapCalculationResults(element) {

        const capitalizeFirstLetter = string => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        if (!element || !element.calculationResult) return ''

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {_.map(['flow', 'pressure'], fieldName => {
                        return (
                            <TableRow key={`${element.key}-${fieldName}`}>
                                <TableCell>{capitalizeFirstLetter(fieldName)}</TableCell>
                                <TableCell>{element.calculationResult[fieldName].value}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        )
    }

    render() {
        return (
            <span>
                {this.mapCalculationResults(this.props.selectedPart)}
            </span>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedPart: state.parts.selectedPart
    }
}

export const StatedCalculatedResultsBox = connect(mapStateToProps)(CalculatedResultsBox)

export default CalculatedResultsBox