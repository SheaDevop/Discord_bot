//initialize dotenv
require('dotenv').config();

//require the discord.js classes
const {Client, Events, GatewayIntentBits} = require('discord.js');
//create a new client instance
const client = new Client({
  intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
	]
 });

//when the client is ready run this code only once
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

//bot log in
client.login(process.env.CLIENT_TOKEN);


//add role and greet a new user
// client.on('guildMemberAdd', (guildMember) => {
//   const channel = client.channels.cache.get('id');
//   const role = interaction.options.getRole('People');
//   const member = guildMember.id
//   if (guildMember.user.bot) return;
//   else {
//     channel.send(`Greeting ${guildMember.user.username}`)
//     member.roles.add(role)
//   }
// });

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