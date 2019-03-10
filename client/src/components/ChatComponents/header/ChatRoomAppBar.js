import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import ChatAppBar from './ChatAppBar'
import MenuIcon from '@material-ui/icons/Menu';


class ChatRoomAppBar extends Component{


    render(){
        const {currParticipants} = this.props;
        return(
            <ChatAppBar text = {currParticipants.toString()}
            buttons = {<>
                
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