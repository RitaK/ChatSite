
import React, { Component } from 'react';
import { List, ListItem, ListItemText, Chip} from '@material-ui/core';
import {getAllUserConversations, registerToGetConversations, getSelectedConversation} from '../../../api'
import {updateUnreadMessagesState, updateLastMessageInLocalStorage} from '../../../localStorageUtils'

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
                this.setState({conversations: updateUnreadMessagesState(convsObjects)});
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
            updateLastMessageInLocalStorage(convID, lastMsg._id);
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


