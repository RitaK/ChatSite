var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var convSchema = new Schema({
    usernamesInConv: [{type: String}],
    //For group chats
    groupName: String,
    messages: [{
        timeStamp: Date,
        sender: String,
        message: String
    }]
});

/* In conversations that have only 2 participants - the group name is generated randomly.
In a group conversation - the user that creates the group should give it a name */
convSchema.index({groupName: 1}, {unique: true});/* ,  sparse: true}); */

var conversations = mongoose.model('conversations', convSchema);

module.exports = conversations;