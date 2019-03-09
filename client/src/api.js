import openSocket from 'socket.io-client';
/* import { resolve } from 'url';
import { rejects } from 'assert'; */
const  socket = openSocket('http://localhost:5000');


export function userLoginSocket(userInfo){
    //Trying to sign the user in
    socket.emit('user login', userInfo);

}

export function signInToSocketEvents(onDisconnect, onUserLogin){

    //On user disconnected
    socket.on('disconnected user', (username) => {
        onDisconnect(username);
    });

    //If user signed in successfully
    socket.on('user login succeeded', (username) => {
        onUserLogin(null, username);
    });

    //If the user couldn't sign in successfuly
    socket.on('user login failed', (errMsg) => {
        onUserLogin(errMsg);
    });

    socket.on('new user save succeeded', () => {
        onUserLogin(null);
    });

}

export function userCreateAccountSocket(userInfo){
    socket.emit('new user', userInfo);
}

export function getAllUserConversations(username){
    socket.emit('get user conversations', username);
}

export function registerToMessageEvents(setConversations){
    
        socket.on('got user conversations', ({err, conversations}) => {
            setConversations(err, conversations);
        });
    }
