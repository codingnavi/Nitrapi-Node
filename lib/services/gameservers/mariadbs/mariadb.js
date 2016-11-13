'use strict';

class MariaDB {
  constructor (service, data) {
    this.service = service;
    for (var name in data) { // copy old data attributes
      if (data.hasOwnProperty(name)) {
        this[name] = data[name];
      }
    }
  }

  import (success, failure, uri) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/mariadbs/' + this.id + '/import', {
      'uri': uri
    }, success, failure);
  }

}

module.exports = MariaDB;
