'use strict';

var Service = require('../service.js');

class Webspace extends Service {
  init (nitrapi, data, success, failure) {
    super.init(nitrapi, data);
    this.refresh(success, failure);
  }

  refresh (success, failure) {
    var service = this;
    this.nitrapi.dataGet('services/' + this.id + '/webspaces', {}, function (data) {
      for (var name in data.webspace) { // copy new data attributes
        if (data.hasOwnProperty(name)) {
          service[name] = data.webspace[name];
        }
      }
      success(service);
    }, failure);
  }
}

module.exports = Webspace;
