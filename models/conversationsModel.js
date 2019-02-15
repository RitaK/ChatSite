var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var convSchema = new Schema({
    idPerson1: String,
    idPerson2: String, 
    messages: [{
        timeStamp: Date,
        message: String
    }]
});

var conversations = mongoose.model('conversations', convSchema);

module.exports = conversations;