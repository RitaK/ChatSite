import React, { Component } from 'react';
import {Grid, Paper, List, ListItem, ListItemText} from '@material-ui/core';
import ChatRoomAppBar from './header/ChatRoomAppBar'


class ChatPanel extends Component{
    constructor(props){
        super(props);
    }

    render(){

        const {messages, currParticipants} = this.props;
        return(
            <Grid item>
                <ChatRoomAppBar currParticipants = {currParticipants}>

                </ChatRoomAppBar>
                <Paper>
                    <List>
                        {messages.map((msg) => 
                            <ListItem 
                                key = {msg._id}>
                                <ListItemText
                                    primary={msg.message}
                                    secondary = {msg.sender}
                                    />
                            </ListItem>)}
                    </List>
                </Paper>
                <Grid item>
                </Grid>
            </Grid>
        );
    }
}


export default ChatPanel;