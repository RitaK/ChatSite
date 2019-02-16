var conversations = require('../models/conversationsModel');
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
        //Delete a specific user
        deleteUser: function(username){
            Users.findOneAndRemove({"username": username}, function(err)
            {
                if(err){
                    console.log('An error occured while removing user ' + username);
                }
                
            });
        },

        getAllUserConv: function(){
            
        },

        //Finds a conversation that contains all the user specified in the array 'users'
        findConversation: function(users){
            var results;
            conversations.find({'$and': [{"usernamesInConv": {"$all": users}}, {"usernamesInConv": {"$size": users.length.toString()}} ] },function(err, docs){
                if(err){
                    console.log('Could not find a converstation between ' + users + '. Error:'+ err);
                }
                else{
                    results =  docs;
                }
                
            });
            return results;
        },

        saveMsgToConv: function(users, message ){


        }

    }
}