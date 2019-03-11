import React, { Component } from 'react';
import {Grid, List, ListItem, ListItemText, TextField} from '@material-ui/core';
import ChatRoomAppBar from './header/ChatRoomAppBar'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {registerToMsgSent, registerToReceivedMsg, registerToGetConv, sendMessage, getSelectedConversation} from './../../api'

var styles = theme =>({
    root: {
        //width: '60%'
    },
    convPanel: {
        height: 'calc(100vh - 114px)',
        overflow: "scroll",
    },
    convContainer:{
        height: 'calc(100vh - 64px)'
    },
    msgTextGrid: {
        'margin-top': '20px',
        bottom: 0,
        position: 'fixed'
    },
    msgText: {
        width: '100vw'
    },
    msgDisplayPanel: {
        height: '50px'
    }

});

class ChatPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentConv: {},
            newMsgValue: ''
        }
        /* this.state = {
            currMessages: this.props.currMessages,
            newMsgValue: ''
        } */
    }

    componentWillMount(){

        registerToGetConv( (err, conversation) => {
            console.log(conversation);
            this.setState({currentConv: conversation});
        });

        registerToMsgSent((err, message) => {
            let {currentConv} = this.state;
            if(currentConv._id){
                this.updateMessages(currentConv._id);
            }
        });

        registerToReceivedMsg((convID, err, message) => {
            if(this.state.currentConv._id && convID === this.state.currentConv._id){
                this.updateMessages(convID);
            } else {
                this.newMessageInConv(convID)
            }
        });
    }

    updateMessages = (convID) => {
        getSelectedConversation(convID);
    }

    onSend = (event) => {
        event.preventDefault();
        let {newMsgValue: message} = this.state;
        let convID = this.state.currentConv._id;
        let fromUser = localStorage.getItem('username');
        let msgObj = {
            timeStamp: this.getCurrDate(),
            sender: fromUser,
            message: message
        };
        sendMessage(msgObj, convID, fromUser);
    }

    handleNewMsgChange = (event) => {
        this.setState({
            newMsgValue: event.target.value
        });
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

        const {classes} = this.props;
        const {currentConv: {messages = [], usernamesInConv = []}} = this.state;
        //const {messages: {messages}  = {}, usernamesInConv: {currParticipants} = {}} = this.state;

        return(
            <Grid sm={7} item className = {classes.root}>
                <ChatRoomAppBar currParticipants = {usernamesInConv}>

                </ChatRoomAppBar>
                <Grid container  className = {classes.convContainer}  direction={'column'}>
                    <Grid className = {classes.convPanel} item>
                        <List>
                            {messages.map((msg) => {
                                if(!msg._id){
                                    return false;
                                }
                                return <ListItem 
                                    key = {msg._id}>
                                    <ListItemText
                                        primary={msg.message}
                                        secondary = {msg.sender}
                                        />
                                    </ListItem>
                            }
                                )}
                        </List>
                    </Grid>
                    <Grid item className = {classes.msgTextGrid}>
                        <form onSubmit={this.onSend} >
                            <TextField value={this.state.newMsgValue} onChange={this.handleNewMsgChange} className = {classes.msgText}>
                            </TextField>
                        </form>
                        
                    </Grid>
                </Grid>
                <Grid item>
                </Grid>
            </Grid>
        );
    }
}

ChatPanel.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(ChatPanel);