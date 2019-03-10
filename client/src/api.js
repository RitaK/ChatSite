import openSocket from 'socket.io-client';
/* import { resolve } from 'url';
import { rejects } from 'assert'; */
const  socket = openSocket('http://localhost:5000');


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

export function registerToMessageEvents(setConversations){
    socket.on('got user conversations', ({err, conversations}) => {
        setConversations(err, conversations);
    });
}

/* export function registerToGetConv(presentConv){
    socket.on('got group user conversation', ({err, conversations}) => {
        presentConv(err, conversations);
    });
    socket.on('got selected group conversation', ({err, conversations}) => {
        presentConv(err, conversations);
    });
}
 */

 export function registerToGetConv(presentConv){
    socket.on('got selected conversation', ({err, conversation}) => {
        presentConv(err, conversation);
    });
}


export function emitUserCreateAccount(userInfo){
    socket.emit('new user', userInfo);
}

export function getAllUserConversations(username){
    socket.emit('get user conversations', username);
}

/* export function userSelectedConversation(usernameToSendTo, currUsername){
    let usersInvolved = {usersInChatSelected: [usernameToSendTo, currUsername]};
    socket.emit('selected user conversation', usersInvolved);
}

export function groupSelectedConversation(groupName){
    socket.emit('selected group conversation', {groupName: groupName});
} */

export function getSelectedConversation(convID){
    socket.emit('selected conversation', {convID: convID});
}
