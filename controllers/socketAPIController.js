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
            connectedUsers.push({ user: username, socket: socket });
            console.log('Connected users ' + connectedUsers);
        }
    }

    io.on('connection', function(socket){
        console.log('A user is connected');
    
        //Disconnecting from the server
        socket.on('disconnect', function(){
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

            var user = _.some(connectedUsers, function(item) {
                return item.username == username && item;
              });

            if(user){
                user.socket.emit('new message', {message: data.message.message, from: socket.username});
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
                            addUserConnectedUserSocket(data.username, socket);    
                        } else{
                            this.err = 'Wrong password';
                        }                     
                    });
                } else {
                    this.err = 'User doesnt exist';
                }
                socket.emit('user login response', {err: this.err, username: data.username});  
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
        socket.on('get user conversations', function(username){
            //Get all user's conversations and send them to the client
            dbUtils.getAllUserConv(username, function(err, docs){
                if(err){

                } else {
                    docs.forEach(function(doc){
                        //Decide if there's a need to join a room
                        if(doc.usernamesInConv.length > 2){
                            //socket.join('room 237');
                        }
                    });
                }
                socket.emit('got user conversations', {err: err, conversations: docs});
            });
        })
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

