'use strict';

class ApplicationServer {
  constructor (service) {
    this.service = service;
  }

  ping (success, failure) {
    this.service.nitrapi.dataGet('services/' + this.service.id + '/gameservers/app_server', {}, success, failure);
  }

  sendCommand (success, failure, command) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/app_server/command', {
      'command': command
    }, success, failure);
  }
}

module.exports = ApplicationServer;
