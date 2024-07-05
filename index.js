//initialize dotenv
require('dotenv').config();

//require the discord.js classes
const {Client, Events, GatewayIntentBits} = require('discord.js');
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
  const channel = client.channels.cache.get('1258503343291105367');
  if (member.user.bot) return;
  else {
    channel.send(`Greetings ${member.user.username}`);
  }
});



//assign a role to new member
client.on('guildMemberAdd', member => {
  const role = member.guild.roles.cache.find(role => role.id === '1258506034088120341');
  member.roles.add(role, 'Welcome to my server');
});



//message functionality
client.on('messageCreate', msg => {
  if (msg.content === '!help') {
    msg.reply(`Robots are designed to help you ${msg.author.username}`);
  } else if (msg.content === '!info') {
    msg.reply("I'm a Discord bot created by Ignacio Dieguez, your orders are mine.");
  } else {
    return;
  }
});
