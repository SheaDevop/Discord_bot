# Discord bot built using:
## Node.js
## Express.js
## Discord.js

## Starter Guide
* ### Clone this repo and run npm install.
* ### Go to https://discord.com/developers/applications.
* ### Create your application and go to the bot tab to copy the client token.
* ### Set up your .env file with this vars and populate its values with the desired ones:
  1. CLIENT_TOKEN = 'your discord bot app token'.
  2. PORT = 'the port that the app listen'.
  3. CHANNEL_ID = 'the text channel id to send the messages'.
  4. ROLE_ID = 'the role to assign to new members'.
  5. USER_TOKEN = 'an authentication token to use in post request headers'.
* ### Go to the oauth2 tab to generate the link to invite the bot to your desired server.
* ### Create and assign a role to the bot at your server that enables the manage roles and send messages actions.
* ### To get the server running run: "node server.js" on your terminal inside the discord bot directory


## Bot functionality
* ### Automatically greet new members upon joining using the on GuildMemberAdd event.
* ### Automatically assign new members a role upon joining using the on GuildMemberAdd event and the assignRole utility function.
* ### Responds to !help command with dummy text using the on MessageCreate event and the respondToMsg utility function.
* ### Responds to !info command with dummy text using the on MessageCreate event and the respondToMsg utility function.


## Server functionality
### Endpoints
* ### /api/server-info => get requests
    #### Sending a get(/api/server-info) retrieves an object with server information.
* ### /api/send-message => post requests
    #### Sending a post(/api/send-message) with the (usertoken: 'your user token') header and the body={channelID: 'the channel id', message: 'the desired message to send to the desired channel'} will send the message contents to the discord server selected text channel.



## Video Demo
* ### https://youtu.be/K90vmI4nslk

