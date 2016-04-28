'use strict';
const restify = require('restify');
const skype = require('skype-sdk');
const Bot = require('./bot');
const botService = new skype.BotService({
  calling: {
    callbackUri: process.env.CALLBACK_URL
  },
  messaging: {
    botId: process.env.BOT_ID,
    serverUrl : "https://apis.skype.com",
    requestTimeout : 15000,
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET
  }
});

botService.on('contactAdded', (bot, data) => {
    bot.reply(`Hello ${data.fromDisplayName}!`, true);
});

const bot = new Bot(botService);
const server = restify.createServer();
server.post('/v1/calls', skype.incomingCallHandler(botService));
server.post('/v1/callback', skype.incomingCallbackHandler(botService));
server.post('/v1/chat', skype.messagingHandler(botService));
const port = process.env.PORT || 8000;
server.listen(port);
console.log('listening on port ' + port);
