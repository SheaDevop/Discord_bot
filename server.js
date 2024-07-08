//env config and imports
require('dotenv').config();
const PORT = process.env.PORT || 3000
const CHANNEL_ID = process.env.CHANNEL_ID
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const { respondToMsg, assignRole } = require('./utils/utils.js');

//create an instance of the express application
const app = express();
// config express to handle JSON
app.use(express.json());


//Bot functionality
//create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

//when the client is ready start the server
client.once('ready', () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);

  //start the server and listen to the port
  app.listen(PORT, (error) => {
    if(!error){
      console.log(`Server is running on port ${PORT}`);
    } else {
      console.error(error);
    }
  });
});

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
client.on('messageCreate', (msg) => {
  if (!msg.author.bot) {
    respondToMsg(msg);
  }
});

//log in with the client token
client.login(process.env.CLIENT_TOKEN);

//Define routes
// /api/server-info route
  app.get('/api/server-info', async (req, res) => {
    try {
      //gets the guild
      const guild = client.guilds.cache.first();
      if (!guild) {
        return res.status(404).json({ error: 'Server not found' });
      }

      //fetch all the members
      await guild.members.fetch();
      //gets the server info
      const serverInfo = {
        serverName: guild.name,
        memberCount: guild.memberCount,
        isAvailable: guild.available,
        createdAt: guild.createdAt,
        id: guild.id,
        memberNames: guild.members.cache.map(member => member.user.username),
      };

      //retrieve server info
      res.status(200).json(serverInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch server info' });
    }
  });


// /api/send-message route
app.post('/api/send-message', function(req, res) {
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




module.exports = {
  app,
  client
};