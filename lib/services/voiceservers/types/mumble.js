'use strict';

class Mumble {
  constructor (service) {
    this.service = service;
  }

  addUser (success, failure, username, password) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/voiceservers/mumble/user', {
      'username': username,
      'password': password
    }, success, failure);
  }

  deleteUser (success, failure, username) {
    this.service.nitrapi.dataDelete('services/' + this.service.id + '/voiceservers/mumble/user', {
      'username': username
    }, success, failure);
  }
}

module.exports = Mumble;
