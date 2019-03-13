import React, { Component } from 'react';
import {Grid} from '@material-ui/core';
import ActionsAppBar from '../header/ActionsAppBar'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ConversationsView from './ConversationsView'

var styles = theme =>({
    root: {
       /*  width: '40%',
        'min-width': 'fit-content' */
    },

});

class SidePanel extends Component{

    render(){
        const {classes, username, handleError} = this.props;

        const conversationsListProps = {
            handleError: handleError,
            username: username
        }
        
        return(
            <Grid sm={5} item className = {classes.root}>
                <ActionsAppBar username = {username}/>
                <ConversationsView {...conversationsListProps}>
                </ConversationsView>
            </Grid>
            
        );
    }
}

SidePanel.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(SidePanel);