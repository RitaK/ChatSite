var Conversations = require('../models/conversationsModel');
var Users = require('../models/usersModel');
var bodyParser = require('body-parser');

module.exports = function(app){

    return {

        //Add a new user to the DB
        addUser: function(username, password, cb){
            var newUser = Users({
                username: username,
                password: password
            });
            newUser.save(function(err) {
                let errMsg = '';

                if(!err){
                    console.log('saved user ' + username);
                }

                if(err){
                    if(err.name === 'MongoError' && err.code === 11000){
                        errMsg = 'This user name already exists in the system';
                        console.log(errMsg);
                    }else{
                        errMsg = err.errMsg;
                    }
                }

                cb(!!errMsg && errMsg);
            });
        },

        //Get user's ID
        getUserId: function(username, callback){
            Users.find({"username": username, function(err, docs){
                if(err){
                    console.log("Error while getting a user's id: "+ err);
                }
                else {
                    callback(docs);
                }
            }});
        },

        //Get user's hashed password
        getUserHashPass: function(username, callback){
            Users.findOne({"username": username}, function(err, user){
                if(err){
                    console.log("Error while getting a user's id: "+ err);
                }
                else {
                    callback(user && user.password);
                }
            });
        },

        //Delete a specific user
        deleteUser: function(username){
            Users.findOneAndRemove({"username": username}, function(err)
            {
                if(err){
                    console.log('An error occured while removing user ' + username);
                }
                
            });
        },

        //Get all user's conversations
        getAllUserConv: function(username, callback){
            var query = {"usernamesInConv" : {"$in": username}};
            Conversations.find(query, function(err, docs){
                if(err){
                    console.log('Error while getting all users: '+ err);
                }
                else{
                    callback(err, docs);
                }
            });
        },

        //Finds and returns the conversation that contains all the user specified in the array 'users'
        findTwoUsersConversation: function(users, callback){
            var that = this;
            var query = {
                '$and': [{
                        "usernamesInConv": {"$all": users}
                    }, {
                        "usernamesInConv": {"$size": users.length.toString()}
                    }] 
            };
            Conversations.findOne(query,function(err, conversation){
                if(err){
                    console.log('Could not find a converstation between ' + users + '. Error:'+ err);
                }
                callback(err, conversation);
            });
        },

        //Finds and returns this group's conversation
        findGroupConversation: function(groupname, callback){
            var that = this;
            var query = {"groupName": groupname};

            Conversations.find(query,function(err, docs){
                if(err){
                    console.log('Could not find a converstation of group: ' + groupname + '. Error:'+ err);
                }
                callback(err, docs);
            });
        },

        findConversationByID: function(convID, callback){
            var query = {_id: convID};

            Conversations.findOne(query,function(err, conversation){
                if(err){
                    console.log('Could not find a converstation of group id: ' + convID + '. Error:'+ err);
                }
                callback(err, conversation);
            });
        },

        //Adds a message to a conversation containing all the users in 'users'
        saveMsgToConvByUsers: function(users, message){
            var query = {
                '$and': [{
                        "usernamesInConv": {"$all": users}
                    }, {
                        "usernamesInConv": {"$size": users.length.toString()}
                    }] 
            };
            Conversations.findOneAndUpdate(query, {$push: {messages: message}}, function(err, docs){
                if(err){
                    console.log('Error in saving a message: '+ err + docs);
                }
            });
        },

        saveMsgToConvByID: function(convID, message, callback){
            var query = {_id: convID};
            Conversations.findOneAndUpdate(query, {$push: {messages: message}}, function(err, docs){
                if(err){
                    console.log('Error in saving a message: '+ err + docs);
                }
                callback(err, docs);
            });
        },

        findAllUsersWhoBeginWith: function(searchValue, callback){
            Users.find({"username" : new RegExp(searchValue, 'i')}, function(err, docs){
                if(err){
                    console.log("Error while searching for users:  "+ err);
                }
                else {
                    
                    callback(err, docs);
                }
            });
        },


        //TO CONTINUE
        saveNewConversation : function(conversation, cb){

            var newConversation = Conversations({
                usernamesInConv: conversation.usernamesInConv,
                groupName: conversation.groupName,
                messages: conversation.messages
            });
            newConversation.save(function(err, conversation) {
                let errMsg = '';

                if(!err){
                    console.log('Created new conv' + conversation._id);
                }

                if(err){
                    errMsg = 'Error while creating a new conversation: ';
                    console.log(errMsg + err);
                }

                cb(err, conversation);
            });
        }

    }
}