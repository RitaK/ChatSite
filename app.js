var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dbController = require('./controllers/dbController');
var setupController = require('./controllers/setupController');

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
//Getting the service that handles the db
var dbService = dbController(app);
/* setupController(); */
var conversation = dbService.findConversation(['rita', 'moshe']);
console.log(conversation);

io.on('connection', function(socket){
    console.log('A user is connected');

    //Disconnecting from the server
    socket.on('disconnect', function(){
        var username = socket.username || "";
        if(connectedUsers.length > 0 && username != ""){
            connectedUsers.splice(connectedUsers.indexOf(username), 1);
        }
        
        console.log('User ' + username + ' disconnected');
      });

    //Sending a message
    socket.on('chat message', function(data){
        console.log('message: ' + data.message);
        io.emit('new message', {message: data.message, username: socket.username});
    });

    //New user
    socket.on('new user', function(data, callback){
        callback(true);
        dbService.addUser(data);
        socket.username = data;
        connectedUsers.push(socket.username);
    })
});




var server = http.listen(port , function(){
    console.log('Server is running on port ' + server.address().port);
})

