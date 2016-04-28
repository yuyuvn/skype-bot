'use strict';
const uuid = require('node-uuid');
const inspect = require('util').inspect;
const debug = require('debug')('skype-sdk.bot');
const skype = require('skype-sdk');
class Bot {
  constructor(botService) {
    botService.onIncomingCall(this.onIncomingCall.bind(this));
  }

  onIncomingCall(incomingCall, workflow, callback) {
    debug('New incoming call:\n' + inspect(incomingCall, { depth: 5 }));

    workflow.actions = [
      new skype.Answer({
          operationId: uuid.v4()
      })
    ];

    callback(null, workflow);
  }
}
module.exports = Bot;
