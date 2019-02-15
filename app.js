var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var http = require('http').Server(app);
var io = require('socket.io')(http);


var port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	
	res.render('index');
	
});

io.on('connection', function(socket){
    console.log('A user is connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
});

mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true });

var server = http.listen(port, function(){
    console.log('Server is running on port ' + server.address().port);
})

