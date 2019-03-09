import React, { Component } from 'react';
import ChatHeader from '../components/ChatComponents/header/ChatHeader';
import {Grid} from '@material-ui/core';
import ChatPanel from '../components/ChatComponents/ChatPanel'
import SidePanel from '../components/ChatComponents/SidePanel'

class Chat extends Component{
    
    render(){

        return(
            <Grid container>
                <ChatHeader/>
                <ChatPanel>
                </ChatPanel>
                <SidePanel>

                </SidePanel>
            </Grid>
            
        );
    }
}

export default Chat;