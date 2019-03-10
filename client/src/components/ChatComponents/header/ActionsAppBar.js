import React, { Component } from 'react';
import ChatAppBar from './ChatAppBar';
import {IconButton} from '@material-ui/core';
import {Search, AddCircle, Delete} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';


class ActionsAppBar extends Component{


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


export default ActionsAppBar;