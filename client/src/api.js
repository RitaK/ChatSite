import openSocket from 'socket.io-client';
/* import { resolve } from 'url';
import { rejects } from 'assert'; */
const  socket = openSocket('http://localhost:5000');

/*
    Login and logout
*/

export function emitUserLogin(userInfo){
    //Trying to sign the user in
    socket.emit('user login', userInfo);

}

export function registerToLoginLogoutEvents(onDisconnect, onUserLogin){

    //On user disconnected
    socket.on('disconnected user', (username) => {
        onDisconnect(username);
    });

    //If user signed in successfully
    socket.on('user login response', ({err, username}) => {
        onUserLogin(err, username);
    });

    socket.on('new user save response', ({err, username}) => {
        onUserLogin(err, username);
    });

}

/*
    Get conversations
*/

export function getAllUserConversations(){
    socket.emit('get user conversations');
}

export function registerToGetConversations(setConversations){
    socket.on('got user conversations', ({err, conversations, withSelectedConvID = '', groupName = ''}) => {
        setConversations(err, conversations, withSelectedConvID);
    });
}

/*
    Get selected conversation
*/

export function getSelectedConversation(convID){
    socket.emit('selected conversation', convID);
}

 export function registerToGetConv(presentConv){
    socket.on('got selected conversation', ({err, conversation, usersConnected, betweenUsers}) => {
        presentConv(err, conversation, usersConnected, betweenUsers);
    });
}

/*
    New user
*/

export function emitUserCreateAccount(userInfo){
    socket.emit('new user', userInfo);
}

/*
    Sending and receiving messages
*/

export function sendMessage (message, convID){
    socket.emit('chat message', {message: message, convID: convID});
}

export function registerToMsgSent(addMessage){
    socket.on('message sent', ({err, message}) => {
        addMessage(err, message);
    });
}

export function registerToReceivedMsg(addMessage){
    socket.on('message received', ({convID, err, message}) => {
        addMessage(convID, err, message);
    });
}

export function registerToUserActive(userActive){
    socket.on('chat user connected', ({username}) => {
        userActive(username);
    });
}

export function registerToUserNotActive(userNotActive){
    socket.on('chat user not connected', ({username}) => {
        userNotActive(username);
    });
}

/*
    Searching for users
*/

export function registerToGetSearchedUsers(setSearchedUsers){
    socket.on('got searched users', (users) => {
        setSearchedUsers(users);
    })
}

export function setUsersSearch(searchValue){
    socket.emit('get searched users', searchValue)
}

/*
    Get private conversation
*/

export function getPrivateConversationWithUsers(withUsernames, groupName){
    socket.emit('get private conversation with user', withUsernames, groupName);
}

/*
    Start a new conversation
*/

export function startNewConversationWithMessage(conversation, withMessage){
    socket.emit('start new conversation', conversation, withMessage);
}

export function startNewConversation(conversation) {
    socket.emit('start new conversation', conversation);
}

/*
    Check if groupname is valid
*/

export function checkGroupName(groupname) {
    socket.emit('check group name', groupname);
}

export function registerToCheckedGroupName(afterGroupNameChecked){
    socket.on('checked group name', ({err, docs}) => {
        afterGroupNameChecked(err, docs);
    })
}