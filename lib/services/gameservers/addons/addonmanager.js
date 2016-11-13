'use strict';

var Addon = require('./addon.js');

class AddonManager {
  constructor (service) {
    this.service = service;
  }

  availableAddon (success, failure) {
    this.service.nitrapi.dataGet('services/' + this.service.id + '/gameservers/addons', {}, function (data) {
      var addonInstances = [];
      for (var name in data.addons) {
        addonInstances.push(new Addon(this.service, name, data.addons[name].description, data.addons[name].status));
      }
    }, failure);
  }
}

module.exports = AddonManager;
