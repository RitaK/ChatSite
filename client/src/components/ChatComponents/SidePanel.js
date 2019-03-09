import React, { Component } from 'react';
import {Grid, List, ListItem, ListItemText} from '@material-ui/core';
import {getAllUserConversations, registerToMessageEvents} from '../../api'

class SidePanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            conversations: []
        }
    }
    componentWillMount(){
        //On getting the conversations
        registerToMessageEvents((err, conversations) => {
            if(err){
                this.props.handleError(err);
            } else{
                this.setState({conversations: conversations});
            }
        });

        getAllUserConversations(this.props.username);
    }
    render(){
        const {conversations} = this.state;
        console.log(conversations);
        return(
            <Grid item>
                <List>
                    {conversations.map((conv) => 
                        <ListItem key = {conv._id}>
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


export default SidePanel;