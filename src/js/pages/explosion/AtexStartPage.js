import React from 'react'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'

class AtexStartPage extends React.Component {
    render() {
        return (
            <div className="Site-content">
                <Paper className="stepper-page">
                    <h1>ATEX calculation</h1>

                    <p><Link to="/atex/new">Click here</Link> to start a new ATEX calculation</p>
                </Paper>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        flex: 1,
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
})

const StyledAtexPage = withStyles(styles)(AtexStartPage)


export default StyledAtexPage