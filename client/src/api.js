import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:5000');


export function userLogin(userInfo ,cb){
    socket.emit('new user', userInfo, (data) => {
        cb(data);
    })
}

