import React, { Component } from 'react';
import {Grid} from '@material-ui/core';
import SidePanel from '../components/ChatComponents/SidePanel'
import ChatPanel from '../components/ChatComponents/ChatPanel'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {registerToGetConv, getSelectedConversation, sendMessage} from '../api'

var styles = theme =>({
    root: {
        height: '100vh'
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
            this.setState({currentConv: conversation, currMessages: conversation.messages, 
                currParticipants: conversation.usernamesInConv});
        });
        
    }

    selectedConv = (convID) => {
        getSelectedConversation(convID);
    };

    sendMessage = (event, message) => {
        let convID = this.state.currentConv._id;
        let fromUser = localStorage.getItem('username');
        let msgObj = {
            timeStamp: this.getCurrDate(),
            sender: fromUser,
            message: message
        };
        sendMessage(msgObj, convID, fromUser);
    }

    newMessageInConv = () => {
        //update the 
    }

    getCurrDate = () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; 
        var yyyy = today.getFullYear();

        if (dd < 10) {
        dd = '0' + dd;
        }

        if (mm < 10) {
        mm = '0' + mm;
        }

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }
    
    render(){
        const {handleError, username, classes} = this.props;
        const {currMessages, currParticipants, currentConv} = this.state;

        const chatPanelProps = {
            messages : currMessages,
            currentConv: currentConv,
            currParticipants: currParticipants,
            sendMessage: this.sendMessage,
            handleError: handleError,
            newMessageInConv: this.newMessageInConv

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