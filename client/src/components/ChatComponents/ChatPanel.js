import React, { Component } from 'react';
import {Grid, List, ListItem, ListItemText} from '@material-ui/core';
import ChatRoomAppBar from './header/ChatRoomAppBar'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {registerToMsgSent, registerToReceivedMsg, registerToGetConv,
     sendMessage, getSelectedConversation,registerToUserActive, registerToUserNotActive} from './../../api'
import TextArea from './TextArea'


var styles = theme =>({
    root: {
        //width: '60%'
    },
    convPanel: {
        height: 'calc(100vh - 114px)',
        overflow: "scroll",
        'background-color': '#e8dce2'
    },
    convContainer:{
        height: 'calc(100vh - 64px)'
    },
    msgTextGrid: {
        'padding': '10px',
        bottom: 0,
        position: 'fixed',
        'background-color': '#b7acac',
        display: 'flex',
        'align-items': 'center',
        'vertical-align': 'middle'
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
            usersConnected: []
        }
        this.messages = React.createRef();
    }

    componentWillMount(){

        registerToGetConv( (err, conversation, usersConnected, privateBetween) => {
            if(conversation){
                this.setState({currentConv: conversation, usersConnected: usersConnected});
            } else if(!err && privateBetween){

            }
            
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
        //console.log(this.messages.current.clientHeight);
    }

    updateMessages = (convID) => {
        getSelectedConversation(convID);
    }

    onSend = (newMsgValue) => {
        
        let convID = this.state.currentConv._id;
        let msgObj = {
            timeStamp: this.getCurrDate(),
            message: newMsgValue
        };
        sendMessage(msgObj, convID);
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

        const {classes, username} = this.props;
        const {currentConv: {messages = [], usernamesInConv = []}, usersConnected} = this.state;

        return(
            <Grid sm={7} item className = {classes.root}>
                <ChatRoomAppBar currParticipants = {usernamesInConv} username = {username} usersConnected = {usersConnected}>

                </ChatRoomAppBar>
                <Grid container  className = {classes.convContainer}  direction={'column'}>
                    <Grid ref = {this.messages} className = {classes.convPanel} item>
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
                                    </ListItem>}
                                )}
                        </List>
                    </Grid>
                    <Grid item className = {classes.msgTextGrid}>
                        <TextArea onSend = {this.onSend}/>
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