import React, { Component } from 'react';
import ChatAppBar from './ChatAppBar'
import {Typography} from '@material-ui/core';



class ChatRoomAppBar extends Component{


    updateConnectedUsers(currParticipants, usersConnected){
        let chatUsersWStatus = currParticipants.map(item => {
            let connected = false;
            if(usersConnected.includes(item)){
                connected= true;
            }
            return {username: item, connected: connected};
        });
        
        return chatUsersWStatus;
    }
    
    
    render(){
        const {currParticipants = [], usersConnected = []} = this.props;
        const connectedUsers = this.updateConnectedUsers(currParticipants,  usersConnected);

        console.log(connectedUsers);
        
        return(
            <ChatAppBar 
            buttons = {<>
                
                </>}
            additionalText = { 
                connectedUsers.map((user) => {
                        if(!user.username){
                            return false;
                        }
                        return <Typography 
                            key = {user.username} variant="h6"  color = {user.connected ? "primary": "secondary"}>
                                {user.username}
                            </Typography>}
                        )}
                />
        );
    }
}


export default ChatRoomAppBar;