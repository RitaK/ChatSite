var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var convSchema = new Schema({
    usernamesInConv: [{type: String}],
    messages: [{
        timeStamp: Date,
        sender: String,
        message: String
    }]
});

var conversations = mongoose.model('conversations', convSchema);

module.exports = conversations;