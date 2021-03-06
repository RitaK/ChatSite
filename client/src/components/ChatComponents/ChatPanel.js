import React, { Component } from 'react';
import {Grid, List, ListItem, ListItemText, Paper, Typography} from '@material-ui/core';
import ChatRoomAppBar from './header/ChatRoomAppBar'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {registerToMsgSent, registerToReceivedMsg, registerToGetConv,
     sendMessage, getSelectedConversation,registerToUserActive, 
     registerToUserNotActive, startNewConversationWithMessage} from './../../api'
import TextArea from './TextArea'
import ReactDOM from 'react-dom'
import {updateLastMessageInLocalStorage} from '../../localStorageUtils'


var styles = theme =>({
    root: {
        //width: '60%'
    },
    convPanel: {
        height: 'calc(100vh - 114px)',
        overflow: "scroll",
        /* 'background-color': '#e8dce2' */
    },
    convContainer:{
        height: 'calc(100vh - 64px)',
        'border-left-style': 'solid',
        'border-left-width': '1px',
        'border-left-color': '#b2a59e5c'
    },
    msgTextGrid: {
        'padding': '10px',
        bottom: 0,
        position: 'fixed',
        'background-color': '#9be7ff',
        display: 'flex',
        'align-items': 'center',
        'vertical-align': 'middle'
    },
    msgDisplayPanel: {
        height: '50px'
    },
    message:{
        'border-color': '#b2a59e',
        'border-style': 'solid',
        'border-radius': '6px',
        'border-width': '1px',
        'padding': '5px'
    },
    userMessageLi: {
        'justify-content': 'flex-end'
    },
    msgTime: {
        float: 'right'
    }

});

class ChatPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentConv: {},
            usersConnected: []
        }
        this.messages = React.createRef();
        this.messagesList = React.createRef();
    }

    componentWillMount(){

        registerToGetConv( (err, conversation, usersConnected, betweenUsers, groupName) => {
            if(!err && conversation){
                this.setState({currentConv: conversation, usersConnected: usersConnected});
            } else if(!err && betweenUsers){
                //If we need to start a new conversation that isn't in the DB yet.
                //We need the betweenUsers because we can't get it from the conversation variable  
                let newConversation = 
                    {usernamesInConv: betweenUsers,
                    messages: []};
                    //If we got a group conversation to start
                    if(groupName && groupName !== ''){
                        newConversation.groupName =  groupName
                    }
                this.setState({currentConv: newConversation, usersConnected: usersConnected});
            }
            
        });

        registerToMsgSent((err, message) => {
            let {currentConv} = this.state;
            if(currentConv._id){
                console.log(message._id);
                updateLastMessageInLocalStorage(currentConv._id, message._id);
                this.updateMessages(currentConv._id);
            }
        });

        registerToReceivedMsg((convID, err, message) => {
            console.log(message._id);
            if(this.state.currentConv._id && convID === this.state.currentConv._id){
                this.updateMessages(convID);
                updateLastMessageInLocalStorage(convID, message._id);
            } else {
                this.props.updateNewMessageOnSidePanel(convID)
            }
        });
    }

    componentDidMount(){
        registerToUserActive((username)=> {
            this.setState((state) => {
                let userInConnectedList = state.usersConnected.find(function(element) {
                    return element === username;
                  });
                if(!userInConnectedList){
                    return {usersConnected : [...state.usersConnected, username]}
                }
            });
        });

        registerToUserNotActive((username)=> {
            this.setState((state) => {
                let userInConnectedList = state.usersConnected.find(function(element) {
                    return element === username;
                  });
                if(userInConnectedList){
                    state.usersConnected.splice( state.usersConnected.indexOf(username), 1 );
                    return {usersConnected : state.usersConnected}
                }
            });
        });
    }

    componentDidUpdate(){
        let messagesGrid =ReactDOM.findDOMNode(this.messages.current);
        let messagesList =ReactDOM.findDOMNode(this.messagesList.current);
        messagesGrid.scrollTop = messagesList.clientHeight;
    }

    updateMessages = (convID) => {
        getSelectedConversation(convID);
    }

    onSend = (newMsgValue) => {
        
        let convID = this.state.currentConv._id;
        let msgObj = {
            timeStamp: new Date(),//this.getCurrDate(),
            message: newMsgValue
        };
        //If the conversation is new and doesnt exist in the DB yet. 
        if(!convID){
            startNewConversationWithMessage(this.state.currentConv, msgObj);
        } else {
            sendMessage(msgObj, convID);
        }
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

    getTime = (date) => {
        let time = new Date(date);
        if(time){
            var hrs = time.getHours();
            var mins = time.getMinutes(); 
    
            return hrs + ':' + mins ;
        }
    }

    checkUserMsg = (senderName) => {
        let {userMessageLi} = this.props.classes;
        let username = sessionStorage.getItem("username");
        let resultIsSender = false;
        if(userMessageLi && username){
            resultIsSender = senderName === username;
        }
        return resultIsSender ? userMessageLi : '';
    }
    
    render(){

        const {classes, username} = this.props;
        const {currentConv: {messages = [], usernamesInConv = []}, usersConnected} = this.state;

        return(
            <Grid sm={8} item className = {classes.root}>
                <ChatRoomAppBar currParticipants = {usernamesInConv} username = {username} usersConnected = {usersConnected}>

                </ChatRoomAppBar>
                <Grid container  className = {classes.convContainer}  direction={'column'}>
                    <Grid ref = {this.messages} className = {classes.convPanel} item>
                        <List ref = {this.messagesList} >
                            {messages.map((msg) => {
                                if(!msg._id || !msg){
                                    return false;
                                }
                                return <ListItem className = {this.checkUserMsg(msg.sender)}
                                    key = {msg._id}>
                                    <Paper className = {classes.message}>
                                        <Typography variant="subtitle2"  color="primary">
                                            {msg.sender}
                                        </Typography>
                                        <ListItemText 
                                            primary={msg.message}
                                            secondary = {msg.timeStamp && this.getTime(msg.timeStamp)}
                                            secondaryTypographyProps = {{className : classes.msgTime}}/>
                                    </Paper>
                                    
                                    </ListItem>}
                                )}
                        </List>
                    </Grid>
                    <Grid item className = {classes.msgTextGrid}>
                        <TextArea onSend = {(e) => this.onSend(e)}/>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

ChatPanel.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(ChatPanel);