import React, { Component } from 'react';
import {Grid, List, ListItem, ListItemText, TextField} from '@material-ui/core';
import ChatRoomAppBar from './header/ChatRoomAppBar'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {registerToMsgSent, registerToReceivedMsg} from './../../api'

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
            currMessages: this.props.currMessages,
            newMsgValue: ''
        }
    }

    componentWillMount(){

        registerToMsgSent((err, message) => {
            this.addMessage(err, message);
        });

        registerToReceivedMsg((err, message, convID) => {
            if(convID === this.props.currentConv._id){
                this.addMessage(err, message);
            } else {
                this.props.newMessageInConv(convID)
            }
        });
    }

    addMessage = (err, message) => {
        if(!err){
            this.setState((state) =>({
                currMessages: state.currMessages.push(message)
            }))
        }else {
            this.props.handleError(err);
        }
    }

    onSend = (event) => {
        event.preventDefault();
        this.props.sendMessage(this.state.newMsgValue);
    }

    handleNewMsgChange = (event) => {
        this.setState({
            newMsgValue: event.target.value
        });
    }
    
    render(){

        const {messages, currParticipants, classes} = this.props;

        return(
            <Grid sm={7} item className = {classes.root}>
                <ChatRoomAppBar currParticipants = {currParticipants}>

                </ChatRoomAppBar>
                <Grid container  className = {classes.convContainer}  direction={'column'}>
                    <Grid className = {classes.convPanel} item>
                        <List>
                            {messages.map((msg) => 
                                <ListItem 
                                    key = {msg._id}>
                                    <ListItemText
                                        primary={msg.message}
                                        secondary = {msg.sender}
                                        />
                                </ListItem>)}
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