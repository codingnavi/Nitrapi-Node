'use strict';

var Service = require('../service.js');
var AddonManager = require('./addons/addonmanager.js');
var ApplicationServer = require('./applicationserver/applicationserver.js');
var CustomerSettings = require('./customersettings/customersettings.js');
var FileServer = require('./fileserver/fileserver.js');
var PluginSystem = require('./pluginsystem/pluginsystem.js');
var TaskManager = require('./taskmanager/taskmanager.js');
var CallbackHandler = require('./callbackhandler.js');
var Arkse = require('./games/arkse.js');
var Minecraft = require('./games/minecraft.js');
var TS3MusicBot = require('./games/ts3musicbot.js');
var MariaDB = require('./mariadbs/mariadb.js');

class Gameserver extends Service {

  init (nitrapi, data, success, failure) {
    super.init(nitrapi, data);
    this.refresh(success, failure);
  }

  refresh (success, failure) {
    var service = this;
    this.nitrapi.dataGet('services/' + this.id + '/gameservers', {}, function (data) {
      for (var name in data.gameserver) { // copy new data attributes
        if (data.hasOwnProperty(name)) {
          service[name] = data.gameserver[name];
        }
      }
      success(service);
    }, failure);
  }

  getCustomerSetting (success, failure) {
    success(new CustomerSettings(this));
  }

  doRestart (success, failure, message = null, restartMessage = null) {
    this.nitrapi.dataPost('services/' + this.id + '/gameservers/restart', {
      'message': message,
      'restart_message': restartMessage
    }, success, failure);
  }


  doStop (success, failure, message = null, stopMessage = null) {
    this.nitrapi.dataPost('services/' + this.id + '/gameservers/stop', {
      'message': message,
      'stop_message': stopMessage
    }, success, failure);
  }

  createDatabase (success, failure, credentials = {}, options = {}) {
    this.nitrapi.dataPost('services/' + this.id + '/gameservers/mariadbs', credentials, function (data) {
      this.getDatabase(success, failure, data.database.id);
    }, failure);
  }

  getDatabases (success, failure) {
    this.nitrapi.dataGet('services/' + this.id + '/gameservers/mariadbs', {}, success, failure);
  }

  getDatabase (success, failure, id) {
    this.nitrapi.dataGet('services/' + this.id + '/gameservers/mariadbs/' + id, {}, function (data) {
      success(new MariaDB(this, data.database));
    }, failure);
  }

  deleteDatabase (success, failure, databaseId) {
    this.nitrapi.dataDelete('services/' + this.id + '/gameservers/mariadbs/' + databaseId, {}, success, failure);
  }

  getLicenseKeys (success, failure) {
    this.nitrapi.dataGet('services/' + this.id + '/gameservers/license_keys', {}, success, failure);
  }

  claimLicenseKeys (success, failure) {
    this.nitrapi.dataPost('services/' + this.id + '/gameservers/license_keys/claim_all', {}, success, failure);
  }

  releaseLicenseKeys (success, failure) {
    this.nitrapi.dataPost('services/' + this.id + '/gameservers/license_keys/release_all', {}, success, failure);
  }

  getGames (success, failure) {
    this.nitrapi.dataGet('services/' + this.id + '/gameservers/games', {}, success, failure);
  }

  installGame (success, failure, game, modpack = null) {
    this.nitrapi.dataPost('services/' + this.id + '/gameservers/games/install', {
      'game': game,
      'modpack': modpack
    }, success, failure);
  }

  uninstallGame (success, failure, game) {
    this.nitrapi.dataPost('services/' + this.id + '/gameservers/games/uninstall', {
      'game': game,
    }, success, failure);
  }

  startGame (success, failure, game) {
    this.nitrapi.dataPost('services/' + this.id + '/gameservers/games/start', {
      'game': game,
    }, success, failure);
  }

  changeFTPPassword (success, failure, password) {
    this.nitrapi.dataPost('services/' + this.id + '/gameservers/ftp/password', {
      'password': password,
    }, success, failure);
  }

  changeMySQLPassword (success, failure, password) {
    this.nitrapi.dataPost('services/' + this.id + '/gameservers/mysql/password', {
      'password': password,
    }, success, failure);
  }

  resetMySQLDatabase (success, failure) {
    this.nitrapi.dataPost('services/' + this.id + '/gameservers/mysql/reset', {}, success, failure);
  }

  getFileServer (success, failure) {
    success(new FileServer(this));
  }

  getApplicationServer (success, failure) {
    success(new ApplicationServer(this));
  }

  getAddons (success, failure) {
    success(new AddonManager(this));
  }

  getPluginSystem (success, failure) {
    success(new PluginSystem(this));
  }

  getCallbackHandler (success, failure) {
    success(new CallbackHandler(this));
  }

  getTaskManager (success, failure) {
    success(new TaskManager(this));
  }

  getAdminLogs (success, failure) {
    this.nitrapi.dataGet('services/' + this.id + '/gameservers/admin_logs', {}, success, failure);
  }

  getStats (success, failure, hours = 24) {
    this.nitrapi.dataGet('services/' + this.id + '/gameservers/stats', {
      'hours': hours
    }, success, failure);
  }

  sendCommand (success, failure, command) {
    this.nitrapi.dataPost('services/' + this.id + '/gameservers/app_server/command', {
      'command': command,
    }, success, failure);
  }

  getGame (success, failure, game) {
    switch (game) {
      case 'arkse':
        success(new Arkse(this));
        break;
      case 'minecraft':
        success(new Minecraft(this));
        break;
      case 'ts3musicbot':
        success(new TS3MusicBot(this));
        break;
      default:
        failure('Game class ' + game + ' not found');
        break;
    }
  }

  changeManagedRootSetting (success, failure, key, value) {
    this.nitrapi.dataPost('services/' + this.id + '/gameservers/managed_root/' + key, {
      'value': value
    }, success, failure);
  }
}

module.exports = Gameserver;
