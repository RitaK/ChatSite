
import React, { Component } from 'react';
import { List, ListItem, ListItemText, Chip} from '@material-ui/core';
import {getAllUserConversations, registerToGetConversations, getSelectedConversation} from '../../../api'

class ConversationsView extends Component{

    constructor(props){
        super(props);
        this.state = {
            conversations: [], 
            selectedConvId: '',
            refreshSideBarConversations: this.props.refreshSideBarConversations || true
        }
    }
    componentDidMount(){
        //On getting the conversations
        registerToGetConversations((err, conversations) => {
            if(err){
                this.props.handleError(err);
            } else{
                let convsObjects = conversations.map(item => {
                    return {conv: item, numOfUnreadMessages: 0}
                })
                this.setState({conversations: this.updateUnreadMessagesState(convsObjects)});
            }
        });

        getAllUserConversations();
    };

    handleListItemClick = (event, convID) => {
        getSelectedConversation(convID);

        let convObj = this.state.conversations.find(convObj => {
            return convObj.conv._id === convID;
        });
        let messages = convObj.conv.messages;
        let lastMsg = messages ? messages[messages.length-1] : '';
        if (lastMsg && lastMsg._id){
            this.updateLastMessageInLocalStorage(convID, lastMsg._id);
        }
        
        this.setState((state) => {
            let newConvs = state.conversations.map((item) => {
                if(item.conv._id === convID){
                    item.numOfUnreadMessages = 0;
                }
                return item;
            });
            return {selectedConvId: convID, conversations: newConvs}
        });
    };

    componentWillReceiveProps(props) {
        const { refreshSideBarConversations } = this.props;
        if (refreshSideBarConversations !== props.refreshSideBarConversations) {

            this.setState((state) => {
                let newConvs = state.conversations.map((item) => {
                    if(props.convIdToInc && item.conv._id === props.convIdToInc){
                        item.numOfUnreadMessages++;
                    }
                    return item;
                });
                return {conversations: newConvs, refreshSideBarConversations: props.refreshSideBarConversations}
            });

            /* this.setState((state) => {
                return {conversations: this.updateUnreadMessagesState(state.conversations)}
            }); */
        }
    }

    updateUnreadMessagesState = (conversations) =>{
        conversations.forEach((convObj) => {
            convObj.numOfUnreadMessages = 0;
            let messages = convObj.conv.messages;
            let lastMsgInStorage = this.readLastMessageFromLocalStorage(convObj.conv._id);
            if(lastMsgInStorage){
                if(messages[messages.length-1] && lastMsgInStorage !== messages[messages.length-1]._id){
                    let numOfUnreadMsgs = 0;
                    for(let i=messages.length-1; i>0; i--){
                        if(messages[i]._id !== lastMsgInStorage){
                            numOfUnreadMsgs++;
                        } else{
                            break;
                        }
                    }
                    convObj.numOfUnreadMessages = numOfUnreadMsgs;
                }
            } else{
                convObj.numOfUnreadMessages = messages.length;
            }
        });
        return conversations;
    }

    readLastMessageFromLocalStorage = (convID) => {
        let lastMsgID = '';
        let username = sessionStorage.getItem("username");
        if(!!username && convID){
            let userData = JSON.parse(localStorage.getItem(username));
            if(!!userData && userData.lastMessagesRead){
                let lastMsgObj = userData.lastMessagesRead.find((lastMsgInConv) => {
                    return lastMsgInConv.convID === convID;
                });
                if(!!lastMsgObj){
                    lastMsgID = lastMsgObj.lastMsgID;
                }
            }
        }
        return lastMsgID;
    }

    updateLastMessageInLocalStorage = (convID, lastMsgID) => {
        let username = sessionStorage.getItem("username");
        if(convID && lastMsgID && username){
            let userData = JSON.parse(localStorage.getItem(username));
            if(!!userData){
                let lastMsgObj = userData.lastMessagesRead.find(item => {
                    return item.convID === convID;
                });
                if(!!lastMsgObj){
                    lastMsgObj.lastMsgID = lastMsgID;
                } else {
                    //We need to create a new lastMsg object for this user
                    lastMsgObj = {lastMsgID: lastMsgID, convID: convID};
                    userData.lastMessagesRead.push(lastMsgObj);
                }
                
            } else {
                userData = {
                        lastMessagesRead : [{lastMsgID: lastMsgID, convID: convID}]
                        }
                console.log(userData);
            }
            
            localStorage.setItem(username, JSON.stringify(userData));
        }
        
    }

    render(){
        const {conversations, selectedConvId} = this.state;
        
        return(
            <List component="nav">
                {conversations.map((convObj) => 
                    <ListItem button 
                        selected={selectedConvId === convObj.conv._id}
                        onClick={event => this.handleListItemClick(event, convObj.conv._id)}
                        key = {convObj.conv._id}>
                        <ListItemText
                            primary={convObj.conv.groupName}
                            secondary = {convObj.conv.usernamesInConv}
                            />
                        {convObj.numOfUnreadMessages > 0 &&
                            <Chip label={convObj.numOfUnreadMessages} color = "secondary" />}
                        
                    </ListItem>)}
            </List>
        );
    }
}


export default ConversationsView;


