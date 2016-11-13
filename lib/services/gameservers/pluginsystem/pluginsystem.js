'use strict';

class PluginSystem {
  constructor (service) {
    this.service = service;
  }

  doInstall (success, failure) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/plugin_system/install', {}, success, failure);
  }

  doUninstall (success, failure) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/plugin_system/uninstall', {}, success, failure);
  }

  doStop (success, failure) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/plugin_system/stop', {}, success, failure);
  }

  doRestart (success, failure) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/plugin_system/restart', {}, success, failure);
  }

  getInfo (success, failure) {
    this.service.nitrapi.dataGet('services/' + this.service.id + '/gameservers/plugin_system/info', {}, success, failure);
  }
}

module.exports = PluginSystem;
