import React from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

class AtexStartPage extends React.Component {
    render() {
        return (
            <div className="Site-content">
                <Paper className="stepper-page">
                    <h2>ATEX zone calculation tool</h2>

                    <h4>What is it?</h4>
                    <p className="information-bullet">
                        The ATEX zone calculation tool helps you calculating the zone type and extent of the zone according to the ATEX regulation.<br />
                        This tool will also generate a report for you in PDF format, that you can use, either as is, or as an appendix or similar in your own report format.
                    </p>

                    <h4>Limitations</h4>
                    <p className="information-bullet">
                        This tool is still in alpha-mode. It means that the functionality may be buggy, missing, confusing or all of the above. SootSafe and Trollmoj Entertainment takes NO responsibility, and cannot be held liable for any of the content generated by this tool. It is ALWAYS the user's responsibility to verify the contents of the report, and all the calculations in it before presenting this to a customer or before using it as a basis for decisions in any kind of construction or similar.
                        Please see our <a href="https://sootsafe.com/app/tos" target="_blank" rel="noopener noreferrer">Terms of Service</a> for more information.
                    </p>

                    <h4>Feedback</h4>
                    <p className="information-bullet">
                        We are always interested in your feedback, be it for correcting bugs, updating documentation or making the overall experience of using SootSafe more streamlined. If you have any comments or questions, please contact us.
                    </p>

                    <p className="information-bullet">
                        <Link to="/atex/new"><Button variant="contained">Start a new ATEX calculation</Button></Link>
                    </p>
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