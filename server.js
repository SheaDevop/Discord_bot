//imports
const express = require('express');
const bodyParser = require('body-parser');
//env config
require('dotenv').config();
const PORT = process.env.PORT
const CHANNEL_ID = process.env.CHANNEL_ID

//Bot functionality
//require the discord.js classes
const {Client, Events, GatewayIntentBits} = require('discord.js');
//require utility functions
const { respondToMsg, assignRole} = require('./utils/utils.js');
//create a new client instance aka a bot instance
const client = new Client({
  intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
	]
});

//when the client is ready this code run only once
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

//bot log in
client.login(process.env.CLIENT_TOKEN);

//greet a new member
client.on('guildMemberAdd', member => {
  const channel = client.channels.cache.get(CHANNEL_ID);
  if (member.user.bot) return;
  else {
    channel.send(`Greetings ${member.user.username}`);
  }
});

//assign a role to new member
client.on('guildMemberAdd', assignRole);

//respond to user !commands
client.on('messageCreate', respondToMsg);

//get serverInfo
let serverInfo
client.on('guildAvailable', guild => {
  serverInfo = {
    serverName: guild.name,
    memberCount: guild.memberCount,
    isAvailable: guild.available,
    createdAt: guild.createdAt,
    description: guild.description,
    id: guild.id,
    memberNames: []
  }
  guild.members.cache.forEach(member => serverInfo.memberNames.push(member.user.username))
});


//app server functionality
//create an instance of the express application
const app = express();
//use bodyParser
app.use(bodyParser());
//start the server and lister to the port
app.listen(PORT, (error) => {
  if(!error){
    console.log(`Server is running on port ${PORT}`);
  } else {
    console.error(error);
  }
});


app.get('/api/server-info', function(req, res) {
  res.send(serverInfo)
});


app.post('/api/send-message', function(req, res, next) {
  if(req.headers.usertoken !== process.env.USER_TOKEN){
    res.status(401).send("Unauthorized")
  } else if(req.body.channelID !== CHANNEL_ID){
    res.status(404).send("wrong text channel")
  } else {
    const channel = client.channels.cache.get(req.body.channelID)
    channel.send(req.body.message)
    res.status(200).json("message sent");
  }
});