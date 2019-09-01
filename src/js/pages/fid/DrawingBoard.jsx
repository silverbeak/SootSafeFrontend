import React from 'react'
import go from 'gojs'
import Card from '@material-ui/core/Card'
import { initDrawingBoard } from '../../gojs/board-tool'
import { initPalette } from '../../gojs/palette-tool'
import ResultBox from '../../components/ResultBox'
import { createNodeTemplate } from '../../gojs/node-template'
import { GojsDiagram } from 'react-gojs'
import { TextField } from '@material-ui/core'
import FidActionBox from '../../components/fid/FidActionBox';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    boardContainerStyle: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        alignContent: 'stretch'
    },    
    paletteStyle: {
        flex: 1,
        marginTop: ".4em",
    },    
    boardAndInfoStyle: {
        flex: 5,
        display: "flex",
        flexDirection: "row",
        paddingLeft: ".4em",
        paddingTop: ".4em"
    },    
    boardStyle: {
        display: "flex",
        flex: "3 0 0"
    },    
    infoBoxStyle: {
        flex: 2
    },    
    errorBoxStyle: {
        marginTop: ".4em",
        minHeight: '5em',
    },    
    rightHandCards: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        flex: "1 1",
        paddingLeft: ".4em",
        paddingRight: ".4em"
    }
})


class DrawingBoard extends React.Component {

    constructor(props) {
        super(props)
        const { projectId, sketchId } = this.props
        this.state = { projectId, sketchId}
    }

    initiateDiagramCreator = () => {
        this.treeDef = go.GraphObject.make;  // for more concise visual tree definitions
        const nodeTemplate = createNodeTemplate(this.treeDef, this.props.partSelected)
        this.myDiagramCreator = initDrawingBoard(this.treeDef, nodeTemplate)
    }

    componentWillMount() {        
        this.initiateDiagramCreator()
    }

    componentDidUpdate() {
        const { sketchId, projectId } = this.props

        if (sketchId !== this.state.sketchId || projectId !== this.state.projectId) {
            this.setState({ projectId, sketchId})
            this.initiateDiagramCreator()
        }
    }

    componentDidMount() {
        const paletteNodeTemplate = createNodeTemplate(this.treeDef, () => { })
        if (!this.myPalette) this.myPalette = initPalette(this.treeDef, paletteNodeTemplate, this.props.palette)
    }

    renderValuesTabContent() {
        return (
            <TextField
                id="targetPressure"
                label="Target Pressure"
                value={this.props.targetPressureValue}
                onChange={this.handleChange('targetPressure')}
            />
        )
    }

    render() {
        const { classes } = this.props

        return (
                <div id="board-container" className={classes.boardContainerStyle}>
                    <Card id="myPaletteDiv" className={classes.paletteStyle}></Card>
                    <div id="board-and-infobox" className={classes.boardAndInfoStyle}>
                        <Card className={classes.boardStyle}>
                            {
                                this.props.sketch ?
                                    <GojsDiagram
                                        diagramId="myDiagramDiv"
                                        model={this.props.sketch.model}
                                        createDiagram={this.myDiagramCreator}
                                        className="myDiagram"
                                        onModelChange={this.props.modelUpdated}
                                        linkFromPortIdProperty="fid"
                                        linkToPortIdProperty="tid"
                                    /> :
                                    <span>Loading sketch...</span>
                            }
                        </Card>
                        <div className={classes.rightHandCards}>
                            <Card id="info-board" className={classes.infoBoxStyle}>
                                <ResultBox partData={this.props.selectedPart} sketchId={this.props.sketchId} />
                            </Card>
                            <Card className={classes.errorBoxStyle}>
                                <FidActionBox {...this.props} />
                            </Card>
                        </div>
                    </div>
                </div>
        )
    }
}

export default withStyles(styles)(DrawingBoard)