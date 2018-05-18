import React from 'react'
import StatedInfoBox from './info-box'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { StatedCalculatedResultsBox } from './calculated-results-box'

function TabContainer(props) {
    return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing.unit * 3,
        backgroundColor: theme.palette.background.paper,
    }
})

class ResultBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = { value: 0 }
    }


    handleChange = (event, value) => {
        this.setState({ value })
    }

    handleChangeIndex = index => {
        this.setState({ value: index })
    }

    render() {
        const { value } = this.state
        return (
            <span>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="Values" />
                        <Tab label="Calculated" />
                    </Tabs>
                </AppBar>

                { value === 0 && <TabContainer dir='rtl'><StatedInfoBox sketchId={this.props.sketchId} /></TabContainer> }
                { value === 1 && <TabContainer dir='rtl'><StatedCalculatedResultsBox /></TabContainer> }
                { value === 2 && <TabContainer dir='rtl'>Errors can go here in the future</TabContainer> }
            </span>
        )
    }
}

export default ResultBox