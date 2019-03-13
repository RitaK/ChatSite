import React, { Component } from 'react';
import {Grid, List, ListItem, ListItemText} from '@material-ui/core';
import {getAllUserConversations, registerToGetConversations} from '../../api'
import ActionsAppBar from './header/ActionsAppBar'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {getSelectedConversation} from '../../api'

var styles = theme =>({
    root: {
       /*  width: '40%',
        'min-width': 'fit-content' */
    },

});

class SidePanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            conversations: []
        }
    }
    componentWillMount(){
        //On getting the conversations
        registerToGetConversations((err, conversations) => {
            if(err){
                this.props.handleError(err);
            } else{
                this.setState({conversations: conversations});
            }
        });

        getAllUserConversations(this.props.username);
    };

    handleListItemClick = (event, convID) => {
        getSelectedConversation(convID);
        this.setState({ selectedConvId: convID });
        
    };

    render(){
        const {conversations, selectedConvId} = this.state;
        const {classes, username} = this.props;

        
        return(
            
                <Grid sm={5} item className = {classes.root}>
                    <ActionsAppBar username = {username}>

                    </ActionsAppBar>
                    <List component="nav">
                        {conversations.map((conv) => 
                            <ListItem button 
                                selected={selectedConvId === conv._id}
                                onClick={event => this.handleListItemClick(event, conv._id)}
                                key = {conv._id}>
                                <ListItemText
                                    primary={conv.groupName}
                                    secondary = {conv.usernamesInConv}
                                    />
                            </ListItem>)}
                    </List>
                </Grid>
            
        );
    }
}

SidePanel.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(SidePanel);