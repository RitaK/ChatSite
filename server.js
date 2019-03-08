var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var http = require('http').Server(app);
var io = require('socket.io')(http, { pingInterval: 500 });
var dbUtils = require('./controllers/dbUtils');
var setupController = require('./controllers/setupController');
var socketAPIController = require('./controllers/socketAPIController');


//Sockets of all connected users at this moment
var connectedUsers = [];

var port = process.env.PORT || 5000;

//app.use('/', express.static(__dirname + '/public'));


//Prevents warning bug from mongoose
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

//Connecting to the DB
mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true });
//Getting the utils that handle the bd
var dbUtils = dbUtils(app);
/* setupController(); */

//Defining socket io api
socketAPIController(io, dbUtils);


var server = http.listen(port , function(){
    console.log('Server is running on port ' + server.address().port);
})

