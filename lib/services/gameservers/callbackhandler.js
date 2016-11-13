'use strict';

class CallbackHandler {
  constructor (service) {
    this.service = service;
    this.reloadTasks();
  }

  installed (success, failure, gameShort) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/callback/installed', {
      'game_short': gameShort
    }, success, failure);
  }

  uninstalled (success, failure, gameShort) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/callback/uninstalled', {
      'game_short': gameShort
    }, success, failure);
  }

  restarted (success, failure) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/callback/restarted', {}, success, failure);
  }

  deleted (success, failure) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/callback/deleted', {}, success, failure);
  }

}

module.exports = CallbackHandler;
