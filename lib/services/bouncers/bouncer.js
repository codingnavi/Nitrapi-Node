'use strict';

var Service = require('../service.js');

class Bouncer extends Service {

  init (nitrapi, data, success, failure) {
    super.init(nitrapi, data);
    this.refresh(success, failure);
  }

  refresh (success, failure) {
    var service = this;
    this.nitrapi.dataGet('services/' + this.id + '/bouncers', {}, function (data) {
      for (var name in data.bouncer) { // copy new data attributes
        if (data.hasOwnProperty(name)) {
          service[name] = data.bouncer[name];
        }
      }
      success(service);
    }, failure);
  }
}

module.exports = Bouncer;
