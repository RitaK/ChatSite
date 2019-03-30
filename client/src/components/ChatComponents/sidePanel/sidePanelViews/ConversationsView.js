
import React, { Component } from 'react';
import { List, ListItem, ListItemText, Chip} from '@material-ui/core';
import {getAllUserConversations, registerToGetConversations, getSelectedConversation} from '../../../../api'
import {updateUnreadMessagesState, updateLastMessageInLocalStorage} from '../../../../localStorageUtils'

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
        registerToGetConversations((err, conversations,  withSelectedConvID) => {
            if(err){
                this.props.handleError(err);
            } else{
                let convsObjects = conversations.map(item => {
                    return {conv: item, numOfUnreadMessages: 0}
                });

                if(withSelectedConvID){
                    this.markLastMsgInConvAsSeenInLS(convsObjects, withSelectedConvID);
                }
                
                this.setState((state) => {
                    let selectedConvId = state.selectedConvId;
                    if(withSelectedConvID){
                        selectedConvId = withSelectedConvID;
                    }
                    return {conversations: updateUnreadMessagesState(convsObjects), selectedConvId: selectedConvId}
                });
            }
        });

        getAllUserConversations();
    };

    handleListItemClick = (event, convID) => {
        getSelectedConversation(convID);

        this.markLastMsgInConvAsSeenInLS(this.state.conversations, convID);
        
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

        }
    }

    markLastMsgInConvAsSeenInLS = (conversations, convID) =>{
        let convObj = conversations.find(convObj => {
            return convObj.conv._id === convID;
        });
        if(convObj){
            let messages = convObj.conv.messages;
            let lastMsg = messages ? messages[messages.length-1] : '';
            if (lastMsg && lastMsg._id){
                updateLastMessageInLocalStorage(convID, lastMsg._id);
            }
        }
        
    }

    getUserPrivateConv = (convObj) => {
        let username = sessionStorage.getItem("username");
        let userFromPrivateConv = '';
        if(username){
            userFromPrivateConv = convObj.conv.usernamesInConv.filter(item => {
                return item !==username;
            })
        }
        return userFromPrivateConv.length === 1 ? userFromPrivateConv : '';
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
                            primary={convObj.conv.groupName || this.getUserPrivateConv(convObj)}
                            secondary = {convObj.conv.usernamesInConv.length > 2 ?
                                 convObj.conv.usernamesInConv.join(', ') : ''}
                            />
                        {convObj.numOfUnreadMessages > 0 &&
                            <Chip label={convObj.numOfUnreadMessages} color = "secondary" />}
                        
                    </ListItem>)}
            </List>
        );
    }
}


export default ConversationsView;


