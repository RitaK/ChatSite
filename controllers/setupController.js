var conversations = require('../models/conversationsModel');
var users = require('../models/usersModel')

module.exports = function(){


        var starterUsers = [
            {
                username: 'moshe',
                password: '123'
            },
            {
                username: 'sigal',
                password: '234'
            },
            {
                username: 'rita',
                password: '345'
            }
        ];
        users.create(starterUsers, function(err, results){
            if (err){
                throw err;
            }
        });

        var starterConvs = [
            {
                usernamesInConv: ['moshe', 'sigal'],
                messages: [{
                    timeStamp: new Date(2019, 02, 16),
                    sender: 'moshe',
                    message: "Whats up sigal?"
                },
                {
                    timeStamp: new Date(2019, 02, 16),
                    sender: 'sigal',
                    message: "All is well, how about you?"
                }
            ]
            },

            {
                usernamesInConv: ['moshe', 'sigal', 'rita'],
                messages: [{
                    timeStamp: new Date(2019, 02, 16),
                    sender: 'rita',
                    message: "Hello hello!"
                },
                {
                    timeStamp: new Date(2019, 02, 16),
                    sender: 'sigal',
                    message: "Heyyya"
                },
                {
                    timeStamp: new Date(2019, 02, 16),
                    sender: 'sigal',
                    message: "How's it going?"
                }
            ]
            },
            {
                usernamesInConv: ['moshe',  'rita'],
                messages: [{
                    timeStamp: new Date(2019, 02, 16),
                    sender: 'rita',
                    message: "Hi!"
                },
                {
                    timeStamp: new Date(2019, 02, 16),
                    sender: 'moshe',
                    message: "hi there"
                }
            ]
            }
        ];

        conversations.create(starterConvs, function(err, results){
            if (err){
                throw err;
            }
        });

};