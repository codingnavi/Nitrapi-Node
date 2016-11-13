'use strict';

var Game = require('./game.js');

class Arkse extends Game {
  constructor (service) {
    super(service, 'arkse');
  }

  getModList (success, failure) {
    this.service.nitrapi.dataGet('services/' + this.service.id + '/gameservers/games/arkse/modlist', {}, success, failure);
  }
}

module.exports = Arkse;
