import React, { Component } from 'react';
import ChatAppBar from './ChatAppBar'
import {Chip} from '@material-ui/core';



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
    
    handleSelectedUserChip= () => {

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
                        return <Chip
                            key = {user.username}
                            label={user.username} 
                            color = {user.connected? "primary":"secondary"}
                            onClick={this.handleSelectedUserChip}
                            />}
                        )}
                />
        );
    }
}


export default ChatRoomAppBar;