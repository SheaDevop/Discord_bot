//initialize dotenv
require('dotenv').config();

//require the discord.js classes
const {Client, Events, GatewayIntentBits} = require('discord.js');
//create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//when the client is ready run this code only once
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

//bot log in
client.login(process.env.CLIENT_TOKEN);

//hello message functionality
// client.on('messageCreate', msg => {
//     if (msg.content === 'Hello') {
//         msg.reply(`Hello ${msg.author.username}`);
//     }
// });