var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dbController = require('./controllers/dbController');
var setupController = require('./controllers/setupController');

//Sockets of all connected users at this moment
var connectedUsers = [];

var port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	
	res.render('index');
	
});

//Prevents warning bug from mongoose
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

//Connecting to the DB
mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true });
//Getting the utils that handle the bd
var dbUtils = dbController(app);
/* setupController(); */


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
        //Bug with the messages - somehow rita's messages were sent to moshe-sigal conversation
        
        //Prevents issue in mongodb when taking the data.to users array
        var newArr = data.to.slice();
        dbUtils.saveMsgToConv(newArr, data.message);
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
        dbUtils.getAllUserConv(data, callback);
        dbUtils.addUser(data);
        socket.username = data;
        //Adding this socket to the connectedUsers
        connectedUsers[socket.username] = socket;
    });

    //The current user selected a user to talk to. 
    //Here we load all the messages from that conversation
    socket.on('selected user', function(data, callback){
        /* var usersInConv = [];
        usersInConv.push(data.userSelected);
        usersInConv.push(socket.username); */
        dbUtils.findConversation(data.userSelected, callback);
    });

    socket.on('ping', msg => {
        alert(msg);
    });
});




var server = http.listen(port , function(){
    console.log('Server is running on port ' + server.address().port);
})

