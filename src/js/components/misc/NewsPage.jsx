import React, { Component } from 'react';
import * as _ from 'lodash'
import { withStyles } from '@material-ui/styles'

const articles = [
    ["SootSafe 0.1 Released", "The very first beta version of SootSafe has finally been released..."],
    ["Benefits of using online tools", "More and more companies are moving towards a web-based infrastructure..."]
]

const style = {
    article: {
        
    }
}

class NewsPage extends Component {
    render() {

        const { classes } = this.props

        const singleArticle = article => {
            return (
                <div key={article[0]} className={classes.article}>
                    <h5>{article[0]}</h5>
                    <p style={{ color: 'gray' }}>
                        {article[1]}
                    </p>
                    <hr />
                </div>
            )
        }

        return (
            <div>
                <p style={{ fontSize: '.9em', color: 'gray'}}>News</p>
                <hr />
                {
                    _.map(articles, singleArticle)
                }
            </div>
        );
    }
}

export default withStyles(style)(NewsPage)