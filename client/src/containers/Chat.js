import React, { Component } from 'react';
import ChatHeader from '../components/ChatComponents/header/ChatHeader';
import {Grid} from '@material-ui/core';
import ChatPanel from '../components/ChatComponents/ChatPanel'
import SidePanel from '../components/ChatComponents/SidePanel'



class Chat extends Component{
    
    
    render(){
        const {handleError, username} = this.props;
        return(
            <Grid container>
{/*                 <ChatHeader/>
                <ChatPanel>
                </ChatPanel> */}
                <SidePanel handleError = {handleError} username = {username}>

                </SidePanel>
            </Grid>
            
        );
    }
}

export default Chat;