import React, { Component } from 'react';
import {Grid} from '@material-ui/core';
import ActionsAppBar from '../header/ActionsAppBar'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ConversationsView from './ConversationsView'
import UserSearchView from './UserSearchView'
import UserProfileView from './UserProfileView'
import resources from '../../../resources/default'

var styles = theme =>({
    root: {
       /*  width: '40%',
        'min-width': 'fit-content' */
    },

});

const {conversations: conversationView, userSearch: userSearchView, userProfile: userProfileView} = resources.sidePanelViews;

class SidePanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            view: conversationView
        }
    }
    onSwitchView = (viewName) =>{
        if(viewName){
            if(viewName === "logout"){

            } else {
                this.setState({view: viewName})
            }
        }
    }

    render(){
        const {classes, username, handleError} = this.props;

        const conversationsListProps = {
            handleError: handleError,
            username: username
        }
        
        return(
            <Grid sm={5} item className = {classes.root}>
                <ActionsAppBar username = {username} onSwitchView = {this.onSwitchView}/>
                {this.state.view === conversationView && <ConversationsView {...conversationsListProps}/>}
                {this.state.view === userSearchView && <UserSearchView {...conversationsListProps}/>}
                {this.state.view === userProfileView && <UserProfileView {...conversationsListProps}/>}
            </Grid>
            
        );
    }
}

SidePanel.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(SidePanel);