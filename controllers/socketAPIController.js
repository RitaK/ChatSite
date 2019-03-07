
var connectedUsers = [];

module.exports = function(io, dbUtils){
    
    io.on('connection', function(socket){
        console.log('A user is connected');
    
        //Disconnecting from the server
        socket.on('disconnect', function(){
            var username = socket.username || "";
            if(connectedUsers.length > 0 && username != ""){
                connectedUsers.splice(connectedUsers.indexOf(username), 1);
            }
    
            //Make user appear offline
            io.emit('disconnected user', username);
            console.log('User ' + username + ' disconnected');
          });
    
        //Sending a message
        socket.on('chat message', function(data, callback){
            //Need to orginize this.
            //Also add group option
            //AND - When the receiving user is not connected - check for this and just save it.
            
            //Copying the users array before the manipulation, so that the db call will work correctly
            var usersInConv = data.to.slice();
            dbUtils.saveMsgToConv(usersInConv, data.message);
    
            
            var index = data.to.indexOf(socket.username);
                if (index > -1) {
                    data.to.splice(index, 1); 
                }
            //show the message on the writer's screen
            callback({message: data.message.message, from: socket.username});
            console.log('message: ' + data.message.message);
            //show the message on the receiver's screen
            if(connectedUsers[data.to]){
                connectedUsers[data.to].emit('new message', {message: data.message.message, from: socket.username});
            }
        });
    
        //New user (or user connected)
        socket.on('new user', function(data, callback){
            //Get all user's conversations and use callback to present them to the client
            dbUtils.getAllUserConv(data.username,  function(docs){
                callback(docs);
                docs.forEach(function(doc){
                    //Decide if there's a need to join a room
                    if(doc.usernamesInConv.length > 2){
                        //socket.join('room 237');
                    }
                });
            });
            dbUtils.addUser(data.username, data.password);
            socket.username = data.username;
            //Adding this socket to the connectedUsers
            connectedUsers[socket.username] = socket;
        });
    
        //The current user selected a user to talk to. 
        //Here we load all the messages from that conversation
        socket.on('selected user', function(data, callback){
            /* var usersInConv = [];
            usersInConv.push(data.userSelected);
            usersInConv.push(socket.username); */
            dbUtils.findConversation(data.usersInChatSelected, callback);
        });
    });
}

