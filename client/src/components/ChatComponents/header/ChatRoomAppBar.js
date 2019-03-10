import React, { Component } from 'react';
import { AppBar } from '@material-ui/core';


class ChatRoomAppBar extends Component{


    render(){
        return(
            <ChatAppBar text = "Conversations" 
            buttons = {<>
                <IconButton aria-label="Search" color="inherit">
                    <Search color="secondary"/>
                </IconButton>
                <IconButton aria-label="Search" color="inherit">
                    <AddCircle color="secondary"/>
                </IconButton>
                <IconButton aria-label="Delete" color="inherit">
                    <Delete color="secondary"/>
                </IconButton>
                </>}
                leftButtonOrIcon = {
                    <IconButton color="inherit" aria-label="Menu">
                        <MenuIcon color = "secondary"/>
                    </IconButton>
                }/>
        );
    }
}


export default ChatRoomAppBar;