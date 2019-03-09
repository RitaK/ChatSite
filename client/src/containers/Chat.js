import React, { Component } from 'react';
import {Grid} from '@material-ui/core';
import SidePanel from '../components/ChatComponents/SidePanel'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

var styles = theme =>({
    root: {
        height: '100%'
    },

});


class Chat extends Component{
    
    
    render(){
        const {handleError, username} = this.props;
        const {classes} = this.props;

        return(
            <Grid container className = {classes.root}>
{/*             
                <ChatPanel>
                </ChatPanel> */}
                <SidePanel handleError = {handleError} username = {username}>

                </SidePanel>
            </Grid>
            
        );
    }
}

Chat.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(Chat);