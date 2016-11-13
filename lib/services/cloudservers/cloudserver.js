'use strict';

var Service = require('../service.js');

class Cloudserver extends Service {
  init (nitrapi, data, success, failure) {
    super.init(nitrapi, data);
    this.refresh(success, failure);
  }

  refresh (success, failure) {
    var service = this;
    success(service);
  }

  getInitialPassword (success, failure) {
    this.nitrapi.dataGet('services/' + this.id + '/cloud_servers/password', {}, success, failure);
  }

  doBoot (success, failure) {
    this.nitrapi.dataPost('services/' + this.id + '/cloud_servers/boot', {}, success, failure);
  }

  doShutdown (success, failure) {
    this.nitrapi.dataPost('services/' + this.id + '/cloud_servers/shutdown', {}, success, failure);
  }

  doReboot (success, failure) {
    this.nitrapi.dataPost('services/' + this.id + '/cloud_servers/reboot', {}, success, failure);
  }

  doHardReset (success, failure) {
    this.nitrapi.dataPost('services/' + this.id + '/cloud_servers/hard_reset', {}, success, failure);
  }

  getConsole (success, failure) {
    this.nitrapi.dataGet('services/' + this.id + '/cloud_servers/console', {}, success, failure);
  }

  changePTRRecord (success, failure, ip, hostname) {
    this.nitrapi.dataPost('services/' + this.id + '/cloud_servers/ptr/' + ip, {
      'hostname': hostname
    }, success, failure);
  }

  changeHostname (success, failure, hostname) {
    this.nitrapi.dataPost('services/' + this.id + '/cloud_servers/hostname', {
      'hostname': hostname
    }, success, failure);
  }

  getAvailableImages (success, failure) {
    this.nitrapi.dataGet('services/' + this.id + '/cloud_servers/images', {}, success, failure);
  }

  getTrafficStatistics (success, failure) {
    this.nitrapi.dataGet('services/' + this.id + '/cloud_servers/traffic', {}, success, failure);
  }

  doReinstall (success, failure, imageId) {
    this.nitrapi.dataPost('services/' + this.id + '/cloud_servers/reinstall', {
      'image_id': imageId
    }, success, failure);
  }

}

module.exports = Cloudserver;
