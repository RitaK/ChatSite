import React, { Component } from 'react';
import {Grid} from '@material-ui/core';
import SidePanel from '../components/ChatComponents/SidePanel'
import ChatPanel from '../components/ChatComponents/ChatPanel'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {registerToGetConv, getSelectedConversation} from '../api'

var styles = theme =>({
    root: {
        height: '100%'
    },

});


class Chat extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentConv: '',
            currMessages: [],
            currParticipants: []
        }
    }

    componentWillMount(){
        registerToGetConv( (err, conversation) => {
            console.log(conversation);
            this.setState({currMessages: conversation.messages, 
                currParticipants: conversation.usernamesInConv});
        });
    }

    selectedConv = (convID) => {
        getSelectedConversation(convID);
    };
    
    render(){
        const {handleError, username, classes} = this.props;
        const {currMessages, currParticipants} = this.state;

        const chatPanelProps = {
            messages : currMessages,
            currParticipants: currParticipants
        }
        return(
            <Grid container className = {classes.root}>
            
                <ChatPanel {...chatPanelProps}>
                </ChatPanel>
                <SidePanel selectedConv = {this.selectedConv} handleError = {handleError} username = {username}>

                </SidePanel>
            </Grid>
            
        );
    }
}

Chat.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(Chat);