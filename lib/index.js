'use strict';

var Client = require('node-rest-client').Client;
var ServiceFactory = require('./services/servicefactory.js');
var Customer = require('./customer/customer.js');

var NITRAPI_LIVE_URL = 'https://api.nitrado.net/';

class Nitrapi {
  constructor (accessToken, locale = null, url = NITRAPI_LIVE_URL) {
    this.client = new Client();
    this.nitrapiUrl = url;
    this.options = {
      access_token: accessToken
    };
    if (locale !== null) {
      this.options.locale = locale;
    }
  }

  ping (success, failure) {
    this.dataGet('ping', {}, success, failure);
  }

  getService (success, failure, id) {
    var api = this;
    this.dataGet('services/' + id, {}, function (data) {
      ServiceFactory.buildService(api, data.service, success, failure);
    }, failure);
  }

  getServices (success, failure) {
    var api = this;
    this.dataGet('services', {}, function (data) {
      ServiceFactory.buildServices(api, data.services, success, failure);
    }, failure);
  }

  getAdmin (success, failure) {
    // TODO
    failure('not yet implemented');
  }

  getCustomer (success, failure) {
    this.dataGet('user', {}, function (data) {
      success(new Customer(this, data.user));
    }, failure);
  }

  dataGet (endpoint, params, success, failure) {
    this.req('get', endpoint, params, success, failure);
  }
  dataPost (endpoint, params, success, failure) {
    this.req('post', endpoint, params, success, failure);
  }
  dataDelete (endpoint, params, success, failure) {
    this.req('delete', endpoint, params, success, failure);
  }
  req (method, endpoint, params, success, failure) {
    for (var name in this.options) {
      if (this.options.hasOwnProperty(name)) {
        params[name] = this.options[name];
      }
    }
    var args = {
      parameters: params
    };

    var func = this.client.get;
    if (method === 'post') {
      func = this.client.post;
    } else if (method === 'delete') {
      func = this.client.delete;
    }

    var req = func(this.nitrapiUrl + endpoint, args, function (data) {
      if (data.status === 'success') {
        if (typeof data.data === 'undefined') {
          success(data.message);
        } else {
          success(data.data);
        }
      } else {
        failure(data.message);
      }
    });
    req.on('requestTimeout', function (req) {
      console.log('request has expired');
      failure('request has expired');
      req.abort();
    });

    req.on('responseTimeout', function () {
      console.log('response has expired');
      failure('response has expired');
    });

    req.on('error', function (err) {
      console.log('ERROR: ' + err);
      failure(err);
    });
  }
}

module.exports = Nitrapi;
