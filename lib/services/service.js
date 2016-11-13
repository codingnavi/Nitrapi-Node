'use strict';

class Service {
  init (nitrapi, data) {
    this.nitrapi = nitrapi;
    for (var name in data) { // copy old data attributes
      if (data.hasOwnProperty(name)) {
        this[name] = data[name];
      }
    }
  }

  getDDoSHistory (success, failure) {
    this.nitrapi.dataGet('services/' + this.id + '/ddos', {},  success, failure);
  }

  getLogs (success, failure, page = 1) {
    this.nitrapi.dataGet('services/' + this.id + '/logs', {'page': page}, success, failure);
  }

  addLog (success, failure, category, message) {
    this.nitrapi.dataPost('services/' + this.id + '/logs', {
      'category': category,
      'message': message
    }, success, failure);
  }
}

module.exports = Service;
