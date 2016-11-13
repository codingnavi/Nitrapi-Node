'use strict';

var Service = require('../service.js');
var Mumble = require('./types/mumble.js');
var Teamspeak3 = require('./types/teamspeak3.js');

class Voiceserver extends Service {
  init (nitrapi, data, success, failure) {
    super.init(nitrapi, data);
    this.refresh(success, failure);
  }

  refresh (success, failure) {
    var service = this;
    this.nitrapi.dataGet('services/' + this.id + '/voiceservers', {}, function (data) {
      for (var name in data.voiceserver) { // copy new data attributes
        if (data.hasOwnProperty(name)) {
          service[name] = data.voiceserver[name];
        }
      }
      success(service);
    }, failure);
  }

  doRestart (success, failure) {
    this.nitrapi.dataPost('services/' + this.id + '/voiceservers/restart', {}, success, failure);
  }

  doStop (success, failure) {
    this.nitrapi.dataPost('services/' + this.id + '/voiceservers/stop', {}, success, failure);
  }

  doReinstall (success, failure) {
    this.nitrapi.dataPost('services/' + this.id + '/voiceservers/reinstall', {}, success, failure);
  }

  doConfigChange (success, failure, key, value) {
    this.nitrapi.dataPost('services/' + this.id + '/voiceservers', {
      'key': key,
      'value': value
    }, success, failure);
  }

  createBackup (success, failure) {
    this.nitrapi.dataPost('services/' + this.id + '/voiceservers/backup', {}, success, failure);
  }

  restoreBackup (success, failure, id) {
    this.nitrapi.dataPost('services/' + this.id + '/voiceservers/backup/' + id + '/restore', {}, success, failure);
  }

  deleteBackup (success, failure, id) {
    this.nitrapi.dataDelete('services/' + this.id + '/voiceservers/backup/' + id , {}, success, failure);
  }

  downloadBackup (success, failure, id) {
    // TODO
    failure('not yet implemented');
  }

  uploadBackup (success, failure, backup) {
    // TODO
    failure('not yet implemented');
  }

  getVoiceserverTypeInstance (success, failure) {
    switch (this.details.type) {
      case 'mumble':
        success(new Mumble(this));
        break;
      case 'teamspeak3':
        success(new Teamspeak3(this));
        break;
      default:
        failure('Voiceserver type ' + this.details.type + ' not found.');
        break;
    }
  }
}

module.exports = Voiceserver;
