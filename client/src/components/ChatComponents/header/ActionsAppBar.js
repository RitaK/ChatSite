import React, { Component } from 'react';
import ChatAppBar from './ChatAppBar';
import {IconButton, Chip} from '@material-ui/core';
import {Search, AddCircle, Delete} from '@material-ui/icons';


class ActionsAppBar extends Component{

    constructor(props){
        super(props);
        this.state = {
            username : ''
        }
    }

    componentDidMount(){
        
    }

    componentDidUpdate(){
        
    }

    handleOpenUserProfile = () => {

    }

    render(){
        return(
            <ChatAppBar 
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
                    <Chip
                        label={this.props.username} 
                        onClick={this.handleOpenUserProfile}/>
                }/>
                
        );
    }
}


export default ActionsAppBar;