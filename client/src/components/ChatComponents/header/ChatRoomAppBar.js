import React, { Component } from 'react';
import ChatAppBar from './ChatAppBar'



class ChatRoomAppBar extends Component{


    render(){
        const {currParticipants = []} = this.props;
        return(
            <ChatAppBar text = {currParticipants.toString()}
            buttons = {<>
                
                </>}
                />
        );
    }
}


export default ChatRoomAppBar;