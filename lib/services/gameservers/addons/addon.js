'use strict';

class Addon {
  constructor (service, name, description, status) {
    this.service = service;
    this.name = name;
    this.description = description;
    this.status = status;
  }

  install (success, failure) {
    this.performAction(success, failure, 'install');
  }

  uninstall (success, failure) {
    this.performAction(success, failure, 'uninstall');
  }

  reinstall (success, failure) {
    this.performAction(success, failure, 'reinstall');
  }

  performAction (success, failure, action) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/addons/' + action, {
      'addon': this.name
    }, success, failure);
  }
}

module.exports = Addon;
