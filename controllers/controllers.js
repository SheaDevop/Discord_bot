//server-info controller
const retrieveInfo = (req, res) => {
    res.send('json object with the server info');
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