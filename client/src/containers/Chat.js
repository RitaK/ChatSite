import React, { Component } from 'react';
import {Grid} from '@material-ui/core';
import SidePanel from '../components/ChatComponents/SidePanel'
import ChatPanel from '../components/ChatComponents/ChatPanel'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

var styles = theme =>({
    root: {
        height: '100vh'
    },

});

class Chat extends Component{
    /* constructor(props){
        super(props);
        
    } */

    
    render(){
        const {handleError, username, classes} = this.props;

        const chatPanelProps = {
            handleError: handleError
        }
        return(
            <Grid container direction={'row'} className = {classes.root}>
                <SidePanel selectedConv = {this.selectedConv} handleError = {handleError} username = {username}/>
                <ChatPanel {...chatPanelProps}/>
                
            </Grid>
            
        );
    }
}

Chat.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(Chat);