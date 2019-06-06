import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import { List, ListItem, ListItemIcon, Divider } from '@material-ui/core'
import * as _ from 'lodash'

function mapStateToProps(state) {
    return {
        user: state.users.user,
        userDetails: state.users.userDetails,
        companies: state.users.companies,
    };
}

const styles = {
    profile: {
        display: 'flex',
        flexDirection: 'row',
    },
    leftBar: {
        display: 'flex',
        flexDirection: 'column',
        width: '10em',
        padding: '1.5em',
    },
    rightBar: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: '1.5em',
        marginLeft: '2em',
    },
    displayName: {
        color: 'gray',
    },
    profilePhoto: {
        borderRadius: '10px'
    },
    sectionHeader: {
        color: 'gray',
        textAlign: 'left',
        fontWeight: 'bold',
    },
    listEntry: {
        marginTop: '.4em'
    }
}

class UserSettings extends Component {

    findProviderDataField = (user, fieldName) => {
        const data = _.find(user.providerData, pd => !!pd[fieldName])
        return _.get(data, fieldName)
    }

    render() {
        const { user, userDetails, companies, classes } = this.props

        if (!user || !userDetails) return <div>Loading user data...</div>

        console.log('company', companies);


        const photoUrl = this.findProviderDataField(user, 'photoURL')
        const displayName = this.findProviderDataField(user, 'displayName')
        const email = this.findProviderDataField(user, 'email')

        const lastLogin = userDetails.lastLogin ? userDetails.lastLogin.toDate().toLocaleDateString() : 'Not known'

        return (
            <div className={classes.profile}>
                <div className={classes.leftBar}>
                    {
                        photoUrl ?
                            <img src={photoUrl} style={{ height: '10em' }} className={classes.profilePhoto} />
                            :
                            <div>No photo to display</div>
                    }

                    <h4 className={classes.displayName}>{displayName}</h4>
                    <b className={classes.displayName}><a href={`mailto:${email}`}>{email}</a></b>

                </div>

                <div className={classes.rightBar}>
                    <div>
                        <div className={classes.sectionHeader}>
                            Last login:
                        </div>
                        <p>{lastLogin}</p>
                    </div>

                    <div>
                        <div className={classes.sectionHeader}>
                            Member of:
                        </div>
                        <List>
                            {
                                _.map(companies, (cd, index) => {
                                    return (
                                        <ListItem key={index} className={classes.listEntry}>
                                            <ListItemIcon>
                                                {
                                                    cd.public.logo ?
                                                        <img src={cd.public.logo} />
                                                        :
                                                        <></>

                                                }
                                            </ListItemIcon>
                                            {cd.public.name}
                                        </ListItem>
                                    )
                                })
                            }
                        </List>

                    </div>
                </div>

            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(withStyles(styles)(UserSettings))