import React from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash/lodash.min'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'

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
                    {_.map(this.props.fieldNamesAndUnits, fieldNameAndUnit => {
                        const { fieldName, unit } = fieldNameAndUnit
                        return (
                            <TableRow key={`${element.key}-${fieldName}`}>
                                <TableCell>{capitalizeFirstLetter(fieldName)}</TableCell>
                                <TableCell>{element.calculationResult[fieldName].toFixed(2)} {unit}</TableCell>
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
        selectedPart: state.parts.selectedPart,
        fieldNamesAndUnits: [
            { fieldName: 'addedFireFlow', unit: 'l/s' },
            { fieldName: 'firePressureDifference', unit: 'Pa' },
            { fieldName: 'aggregatedRegularFlow', unit: 'l/s' },
            { fieldName: 'pointRegularPressure', unit: 'Pa' },
            { fieldName: 'addedRegularFlow', unit: 'l/s' },
            { fieldName: 'aggregatedFireFlow', unit: 'l/s' },
            { fieldName: 'pointFirePressure', unit: 'Pa' },
            { fieldName: 'regularPressureDifference', unit: 'Pa' }
        ]
    }
}

export const StatedCalculatedResultsBox = connect(mapStateToProps)(CalculatedResultsBox)

export default CalculatedResultsBox