var bcrypt = require('bcrypt');
const saltRounds = 10;

var connectedUsers = [];


module.exports = function(io, dbUtils){
    var self = this;

    self.addUserConnectedUserSocket = function(username, socket){
        let user = connectedUsers.find((item) => item.username === username);
        
        if(user){
            io.emit('loginNameExists', username);
            console.log('user ' + username+ ' is already logged in')
        } else {
            //Adding this socket to the connectedUsers
            connectedUsers.push({ username: username, socket: socket });
            
        }
    }

    io.on('connection', function(socket){
        console.log('A user is connected');
    
        socket.on('disconnecting', function(reason){
            var id = socket.id;
            //Notify all rooms that this user is disconnected
            for(room in socket.rooms ){
              // For each room the user is in, excluding his own room
              if(room != id){
                    io.to(room).emit('chat user not connected', {username: socket.username});
              }
            };
          });

        //Disconnecting from the server
        socket.on('disconnect', function(socketDis){
            var username = socket.username || "";
            if(connectedUsers.length > 0 && username != ""){
                let user = connectedUsers.find((item) => item.username === username);
                if(user){
                connectedUsers.splice(connectedUsers.indexOf(user), 1);
                }
                
            }
            
            //Make user appear offline
            socket.emit('disconnected user', username);
            console.log('User ' + username + ' disconnected');
            console.log('Connected users ' + connectedUsers);
          });
    

        socket.on('chat message', function(data){
            //message, convID, fromUser
            if(data.message){
                data.message.sender = socket.username;

                dbUtils.saveMsgToConvByID(data.convID, data.message, (err,message) => {
                    let msgInfo = {err: err, message: message};
                    socket.emit('message sent', {...msgInfo});
                    socket.broadcast.to(data.convID).emit('message received', {convID: data.convID, ...msgInfo});
                    //io.to(data.convID).emit('message received', {convID: data.convID, ...msgInfo});
                });
            }
        });
    
        //New user (or user connected)
        socket.on('user login', function(data){

            //Get the user's password from the DB, if he exists
            dbUtils.getUserHashPass(data.username, function(hashedPass){
                this.err = '';
                if(hashedPass){
                    bcrypt.compare(data.password, hashedPass).then((res) => {
                        if(res){
                            socket.username = data.username;
                            addUserConnectedUserSocket(data.username, socket);    
                        } else{
                            this.err = 'Wrong password';
                        }
                        console.log('User '+ data.username + ' is logged in');
                        socket.emit('user login response', {err: this.err, username: data.username});                       
                    });
                } else {
                    this.err = 'User doesnt exist';
                    socket.emit('user login response', {err: this.err, username: data.username});  
                }
                
            });
            
        });
    

        //New user
        socket.on('new user', function(data){
            //Generating a hash with salt from the password
            bcrypt.hash(data.password, saltRounds).then(function(hash) {
                dbUtils.addUser(data.username, hash, function (err){
                    if(!err){
                        socket.username = data.username;
                        addUserConnectedUserSocket(data.username, socket);
                    }
                    socket.emit('new user save response', {err: err, username: data.username});
                });
            });
        });

        //Get all user's conversations (when logged in)
        socket.on('get user conversations', function(){
            //Get all user's conversations and send them to the client
            getUserConversations(socket);
        })
        

        socket.on('selected conversation', function(convID){
            dbUtils.findConversationByID(convID, (err, conversation) =>{

                if(!err){
                    let usersConnectedToRoom =  getUsersConnectedToRoom(conversation);
                    socket.emit('got selected conversation', {err: err, conversation: conversation, usersConnected: usersConnectedToRoom});
                }
                
            }) ;
        });

        socket.on('get current username', function(){
            socket.emit('got current username', socket.username || '');
        });

        socket.on('get searched users', function(searchValue){
            dbUtils.findAllUsersWhoBeginWith(searchValue, (err, users) => {
                if(!err){
                    socket.emit('got searched users', users);
                }
            });
            
        });

        socket.on('get private conversation with user', function(withUsernames, groupName){
            let usersInConv = [...withUsernames, socket.username];
            dbUtils.findTwoUsersConversation(usersInConv, (err, conversation) => {
                if(!err ){
                    let usersConnectedToRoom = [];
                    //If there is no conversation in the DB
                    usersConnectedToRoom =  getUsersConnectedToRoom(conversation);

                    if(!conversation){
                        let socketsOfConnectedUsers = getConnectedUsersFromUserList(usersInConv);
                        usersConnectedToRoom = socketsOfConnectedUsers.map((item) => {return item.username});
                    }
                    socket.emit('got selected conversation', {err: err, conversation: conversation, usersConnected: usersConnectedToRoom, betweenUsers: usersInConv, groupName: groupName});
                }
            });
            
        });

        socket.on('start new conversation', function(conversation, message){
            //If a message is also sent to start the conversation off - add it 
            if(message){
                message.sender = socket.username;
                conversation.messages.push(message);
            }
            dbUtils.saveNewConversation(conversation, (err, conversation) => {
                if(!err){
                    let socketsOfConnectedUsers = getConnectedUsersFromUserList(conversation.usersInConv);
                    for(socket in socketsOfConnectedUsers){
                        socket.join(conversation.id);
                    }
                    usersConnectedToRoom = socketsOfConnectedUsers.map((item) => {return item.username});
                    let resultData = {err: err,
                        conversation: conversation,
                        usersConnected: usersConnectedToRoom,
                        betweenUsers: conversation.usernamesInConv};
                    socket.emit('got selected conversation', resultData);
                    notifyOtherUsersAboutConv(conversation.usernamesInConv, socket);
                    getUserConversations(socket, conversation.id);
                }
            });
            
        });

        socket.on('check group name', function(groupName){
            dbUtils.findGroupConversation(groupName, (err, docs) => {
                socket.emit("checked group name", {err, docs});
            })
        });
        
        socket.on('get searched conversations', function(searchValue){
            if(socket && socket.username){
                dbUtils.findAllConvsFromSearchVal(searchValue, socket.username, (err, conversations) => {
                    if(!err){
                        socket.emit('got user conversations', {err: err, conversations: conversations});
                    }
                });
            }
            
        });

    });

    const getConnectedUsersFromUserList = (usersList) => {
        let currentlyConnected = [];
        if(usersList){
            currentlyConnected= usersList.map((usernameFromList) => {
                return(connectedUsers.find((item) => item.username === usernameFromList) || false);
            });
        }
        return currentlyConnected;
    }

    const getUsersConnectedToRoom = (conversation) => {
        let usersConnectedToRoom =  [];
        //Get the clients connected to the room
        if(conversation){
            let clientsInRoom =io.sockets.adapter.rooms[conversation.id]? io.sockets.adapter.rooms[conversation.id].sockets : [];
        
            for(clientID in clientsInRoom){
                let clientSocket = io.sockets.connected[clientID];
                if(clientSocket.username){
                    usersConnectedToRoom.push(clientSocket.username);
                }
            }
        }
        
        return usersConnectedToRoom;
    };

    const getUserConversations = (socket, withSelectedConvID) => {
        if(socket && socket.username){
            dbUtils.getAllUserConv(socket.username, function(err, conversations){
                if(err){
        
                } else {
                    //Leave all rooms 
                    for(room in socket.rooms ){
                        // For each room the user is in, excluding his own room
                        if(room != socket.id){
                              socket.leave(room);
                        }
                      };
    
                    //Connect to all updated conversations rooms
                    conversations.forEach(function(conv){
                        socket.join(conv.id);
                        io.to(conv.id).emit('chat user connected', {username: socket.username});
                    });
                }
                socket.emit('got user conversations', {err: err, conversations: conversations, withSelectedConvID: withSelectedConvID || '' });
            });
        }
    };

    const notifyOtherUsersAboutConv = (usersInConv, socket) => {
        if(usersInConv && usersInConv.length > 0){
            usersInConv.forEach((username) => {
                //If the current username is not the user who initiated the conversation
                if(username != socket.username){
                    let user = connectedUsers.find((item) => item.username === username);
                    if(!!user && user.socket){
                        getUserConversations(user.socket);
                    }
                }  
            })
        }
    }
}


