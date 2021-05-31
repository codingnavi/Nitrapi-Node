'use strict';

var Service = require('./service.js');
var Bouncer = require('./bouncers/bouncer.js');
var Clanpage = require('./clanpages/clanpage.js');
var Cloudserver = require('./cloudservers/cloudserver.js');
var Gameserver = require('./gameservers/gameserver.js');
var Rootserver = require('./rootservers/rootserver.js');
var Storage = require('./storages/storage.js');
var Voiceserver = require('./voiceservers/voiceserver.js');
var Webspace = require('./webspaces/webspace.js');

module.exports.buildService = function (nitrapi, data, success, failure) {
  switch (data.type) {
    case 'bouncer':
      var bouncer = new Bouncer();
      bouncer.init(nitrapi, data, success, failure);
      break;
    case 'clanpage':
      var clanpage = new Clanpage();
      clanpage.init(nitrapi, data, success, failure);
      break;
    case 'cloud_server':
      var cloudserver = new Cloudserver();
      cloudserver.init(nitrapi, data, success, failure);
      break;
    case 'gameserver':
      var gameserver = new Gameserver();
      gameserver.init(nitrapi, data, success, failure);
      break;
    case 'rootserver':
      var rootserver = new Rootserver();
      rootserver.init(nitrapi, data, success, failure);
      break;
    case 'storage':
      var storage = new Storage();
      storage.init(nitrapi, data, success, failure);
      break;
    case 'voiceserver':
      var voiceserver = new Voiceserver();
      voiceserver.init(nitrapi, data, success, failure);
      break;
    case 'webspace':
      var webspace = new Webspace();
      webspace.init(nitrapi, data, success, failure);
      break;
    default:
      console.log('ERROR');
      console.log('Service type ' + data.type + ' unknown.');
      var service = new Service();
      service.init(nitrapi, data);
      success(service);
      break;
  }
};

function buildServiceArray (nitrapi, first, rest, finished, success, failure) {
 
  module.exports.buildService(nitrapi, first, function (data) {
    finished.push(data);
    if (rest.length > 0) {
      var first = rest.shift();
      buildServiceArray(nitrapi, first, rest, finished, success, failure);
    } else {
     
      success(finished);
    }
  }, failure);
}

module.exports.buildServices = function (nitrapi, data, success, failure) {
  var first = data.shift();
  buildServiceArray(nitrapi, first, data, [], success, failure);
};
