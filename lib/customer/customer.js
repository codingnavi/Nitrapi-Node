'use strict';

class Customer {
  constructor (nitrapi, data) {
    this.nitrapi = nitrapi;
    this.loadData(data);
  }

  loadData (data) {
    for (var name in data) { // copy old data attributes
      if (data.hasOwnProperty(name)) {
        this[name] = data[name];
      }
    }
  }

  getWebinterfaceToken (success, failure) {
    this.nitrapi.dataGet('user/webinterface_token', {}, function (data) {
      success(data.token.token);
    }, failure);
  }

  deleteWebinterfaceTokens (success, failure) {
    this.nitrapi.dataDelete('user/webinterface_token', {}, success, failure);
  }
}

module.exports = Customer;
