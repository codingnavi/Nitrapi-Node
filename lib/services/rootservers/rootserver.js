'use strict';

var Service = require('../service.js');

class Rootserver extends Service {
  init (nitrapi, data, success, failure) {
    super.init(nitrapi, data);
    this.refresh(success, failure);
  }

  refresh (success, failure) {
    var service = this;
    success(service);
  }
}

module.exports = Rootserver;
