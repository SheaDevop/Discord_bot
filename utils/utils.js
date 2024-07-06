//env config
require('dotenv').config();
const ROLE_ID = process.env.ROLE_ID

//aux functions

const respondToMsg = msg => {
  if (msg.content === '!help') {
    msg.reply(`Robots are designed to help you ${msg.author.username}`);
  } else if (msg.content === '!info') {
    msg.reply("I'm a Discord bot created by Ignacio Dieguez, your orders are mine.");
  } else {
    return;
  }
};

const assignRole = member => {
  const role = member.guild.roles.cache.find(role => role.id === ROLE_ID);
  member.roles.add(role, 'Welcome to my server');
}




module.exports = {
  respondToMsg,
  assignRole
}