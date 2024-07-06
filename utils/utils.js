const respondToMsg = msg => {
    if (msg.content === '!help') {
      msg.reply(`Robots are designed to help you ${msg.author.username}`);
    } else if (msg.content === '!info') {
      msg.reply("I'm a Discord bot created by Ignacio Dieguez, your orders are mine.");
    } else {
      return;
    }
}

module.exports = {
    respondToMsg
}