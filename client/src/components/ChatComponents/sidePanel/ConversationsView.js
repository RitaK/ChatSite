
import React, { Component } from 'react';
import { List, ListItem, ListItemText} from '@material-ui/core';
import {getAllUserConversations, registerToGetConversations, getSelectedConversation} from '../../../api'

class ConversationsView extends Component{

    constructor(props){
        super(props);
        this.state = {
            conversations: []
        }
    }
    componentDidMount(){
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
        
        return(
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
        );
    }
}


export default ConversationsView;


