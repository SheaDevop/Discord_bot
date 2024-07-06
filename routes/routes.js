//require the router module
const { Router } = require('express');

//require controllers
const controller = require('../controllers/controllers');

//initialize router
const router = Router();

//app routes
//get server info route
router.get('/api/server-info', controller.retrieveInfo);
//send message to server channel route
router.post('/api/send-message', controller.sendMessage);

module.exports = router;