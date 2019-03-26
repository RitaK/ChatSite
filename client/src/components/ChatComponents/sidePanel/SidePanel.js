import React, { Component } from 'react';
import {Grid} from '@material-ui/core';
import ActionsAppBar from '../header/ActionsAppBar'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ConversationsView from './sidePanelViews/ConversationsView'
import UserSearchView from './sidePanelViews/UserSearchView'
import UserProfileView from './sidePanelViews/UserProfileView'
import NewGroupView from './sidePanelViews/NewGroupView'
import resources from '../../../resources/default'

var styles = theme =>({
    root: {
       /*  width: '40%',
        'min-width': 'fit-content' */
    },

});

const {conversations: conversationView, userSearch: userSearchView, userProfile: userProfileView, newGroup: newGroupView} = resources.sidePanelViews;

class SidePanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            view: conversationView,
            refreshSideBarConversations: this.props.refreshSideBarConversations || true
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

    componentWillReceiveProps(props) {
        const { refreshSideBarConversations} = this.props;
        if (refreshSideBarConversations !== props.refreshSideBarConversations) {
            this.setState({refreshSideBarConversations: props.refreshSideBarConversations});
        }
        
    }

    render(){
        const {classes, username, handleError, unreadMessages, readMessagesAtConv, convIdToInc} = this.props;
        const {refreshSideBarConversations} = this.state;

        const conversationsListProps = {
            handleError: handleError,
            username: username, 
            unreadMessages: unreadMessages,
            readMessagesAtConv: readMessagesAtConv, 
            refreshSideBarConversations: refreshSideBarConversations, 
            convIdToInc: convIdToInc ? convIdToInc : ''
        }

        const userSearchListProps = {
            handleError: handleError,
            onSwitchView: this.onSwitchView
        }

        const newGroupViewProps = {
            handleError: handleError,
            onSwitchView: this.onSwitchView
        }
        
        return(
            <Grid sm={5} item className = {classes.root}>
                <ActionsAppBar username = {username} onSwitchView = {this.onSwitchView}/>
                {this.state.view === conversationView && <ConversationsView {...conversationsListProps}/>}
                {this.state.view === newGroupView && <NewGroupView {...newGroupViewProps}/>}
                {this.state.view === userSearchView && <UserSearchView {...userSearchListProps}/>}
                {this.state.view === userProfileView && <UserProfileView {...conversationsListProps}/>}
            </Grid>
            
        );
    }
}

SidePanel.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(SidePanel);