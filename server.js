//imports
const express = require('express');
const routes = require('./routes/routes');
//env config
require('dotenv').config();
const PORT = process.env.PORT
const CHANNEL_ID = process.env.CHANNEL_ID

//Bot functionality
//require the discord.js classes
const {Client, Events, GatewayIntentBits} = require('discord.js');
//require utility functions
const { respondToMsg, assignRole } = require('./utils/utils.js');
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


//app server functionality
//create an instance of the express application
const app = express();

app.use('/', routes)

//start the server and lister to the port
app.listen(PORT, (error) => {
  if(!error){
    console.log(`Server is running on port ${PORT}`);
  } else {
    console.error(error);
  }
});
