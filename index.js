//initialize dotenv
require('dotenv').config();

//define client intents
const {Client, GatewayIntentBits} = require('discord.js');
const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//bot log in
client.login(process.env.CLIENT_TOKEN);

//hello message functionality
client.on('messageCreate', msg => {
    if (msg.content === 'Hello') {
        msg.reply(`Hello ${msg.author.username}`);
    }
});