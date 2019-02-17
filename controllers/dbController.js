var Conversations = require('../models/conversationsModel');
var Users = require('../models/usersModel');
var bodyParser = require('body-parser');

module.exports = function(app){

    return {

        //Add a new user to the DB
        addUser: function(username, password){
            var newUser = Users({
                username: username,
                password: password
            });
            newUser.save(function(err) {
                if(err){
                    console.log("There was a problem saving this user: "+ err);
                }
                else{
                    console.log('saved user ' + username);
                }
                
            });
        },

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
                    callback(docs);
                }
            });
        },

        //Finds and returns the conversation that contains all the user specified in the array 'users'
        findConversation: function(users, callback){
            var that = this;
            var query = {
                '$and': [{
                        "usernamesInConv": {"$all": users}
                    }, {
                        "usernamesInConv": {"$size": users.length.toString()}
                    }] 
            };
            Conversations.find(query,function(err, docs){
                if(err){
                    console.log('Could not find a converstation between ' + users + '. Error:'+ err);
                }
                else{
                    callback(docs);
                }
            });
        },

        //Adds a message to a conversation containing all the users in 'users'
        saveMsgToConv: function(users, message){
            var query = {
                '$and': [{
                        "usernamesInConv": {"$all": users}
                    }, {
                        "usernamesInConv": {"$size": users.length.toString()}
                    }] 
            };
            Conversations.findOneAndUpdate(query, {$push: {messages: message}}, function(err){
                if(err){
                    console.log('Error in saving a message: '+ err);
                }
            });
        }

    }
}