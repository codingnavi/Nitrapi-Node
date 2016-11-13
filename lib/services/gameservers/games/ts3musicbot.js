'use strict';

var Game = require('./game.js');

class TS3Musicbot extends Game {
  constructor (service) {
    super(service, 'ts3musicbot');
  }

  getModList (success, failure) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/games/ts3musicbot/reinstall', {}, success, failure);
  }
}

module.exports = TS3Musicbot;
