import React, { Component } from 'react';
import ChatAppBar from './ChatAppBar';
import {Button} from '@material-ui/core';


class ActionsAppBar extends Component{


    render(){
        return(
            <ChatAppBar text = "Conversations">
                <Button color="primary">Find</Button>
                <Button color="primary">Group Chat</Button>
            </ChatAppBar>
        );
    }
}


export default ActionsAppBar;