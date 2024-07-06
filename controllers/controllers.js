const serverInfo = require('../server.js')

//server-info controller
const retrieveInfo = (req, res) => {
    res.send(serverInfo);
}

//send message to server channel controller
const sendMessage = (req, res) => {
    //logic of the controller goes here with the proper authentication
}

// Export methods as object 
module.exports = { 
    retrieveInfo, 
    sendMessage 
}