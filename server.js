'use strict';
const restify = require('restify');
const skype = require('skype-sdk');
const Bot = require('./bot');
const botService = new skype.BotService({
  calling: {
    callbackUri: 'https://skype-answer-bot.azurewebsites.net/v1/callback'
  }
});
const bot = new Bot(botService);
const server = restify.createServer();
server.use(skype.ensureHttps(true));
server.post('/v1/calls', skype.incomingCallHandler(botService));
server.post('/v1/callback', skype.incomingCallbackHandler(botService));
const port = process.env.PORT || 8000;
server.listen(port);
console.log('listening on port ' + port);
