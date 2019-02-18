var configValues = require('./config');

module.exports = {
    getDbConnectionString: function() {
        return 'mongodb+srv://' +
        configValues.uname + 
        ':' + configValues.pwd +
        '@clusterr-7lbci.mongodb.net/chatApp?retryWrites=true'
    }
}