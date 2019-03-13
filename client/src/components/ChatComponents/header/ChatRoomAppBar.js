import React, { Component } from 'react';
import ChatAppBar from './ChatAppBar'
import {Chip} from '@material-ui/core';


const connectedUserStyle = {
    'backgroundColor': '#3bd665e8143b'
  };

const notConnectedUserStyle = {
    'backgroundColor': '#'
};

class ChatRoomAppBar extends Component{


    updateConnectedUsers(currParticipants, usersConnected){
        
        let chatUsersWStatus = currParticipants.map(item => {
            if(item === this.props.username){
                return false;
            }
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
                            style = {user.connected? connectedUserStyle: notConnectedUserStyle}
                            onClick={this.handleSelectedUserChip}
                            />}
                        )}
                />
        );
    }
}


export default ChatRoomAppBar;