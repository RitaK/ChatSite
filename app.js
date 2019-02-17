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

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	
	res.render('index');
	
});

//Connecting to the DB
mongoose.set('useCreateIndex', true);
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
    socket.on('chat message', function(data){
        console.log('message: ' + data.message);
        io.emit('new message', {message: data.message, username: socket.username});
    });

    //New user (or user connected)
    socket.on('new user', function(data, callback){
        dbUtils.getAllUserConv(data, callback);
        dbUtils.addUser(data);
        socket.username = data;
        //Adding this socket to the connectedUsers
        connectedUsers[socket.username] = socket;
    })
});




var server = http.listen(port , function(){
    console.log('Server is running on port ' + server.address().port);
})

