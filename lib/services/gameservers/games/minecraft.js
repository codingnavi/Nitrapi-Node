'use strict';

var Game = require('./game.js');

class Minecraft extends Game {
  constructor (service) {
    super(service, 'minecraft');
  }

  startChunkfix (success, failure, world, limit = 0) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/games/minecraft/chunkfix', {
      'world': world,
      'limit': limit
    }, success, failure);
  }

  renderOverviewMap (success, failure) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/games/minecraft/overviewmap_render', {}, success, failure);
  }

  getOverviewMapLog (success, failure) {
    this.service.nitrapi.dataGet('services/' + this.service.id + '/gameservers/games/minecraft/overviewmap_log', {}, success, failure);
  }

  setOverviewMap (success, failure, enabled = false, signs = true, ipsonly = null, reset = false) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/games/minecraft/overviewmap', {
      'enabled': enabled,
      'signs': signs,
      'reset': reset,
      'ipsonly': ipsonly
    }, success, failure);
  }

  setBungeeCord (success, failure, enabled = false, only = false, firewall = 'off', ip = null) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/games/minecraft/bungeecord', {
      'enabled': enabled,
      'only': only,
      'firewall': firewall,
      'firewall_ip': ip
    }, success, failure);
  }

  setRemoteToolkit (success, failure, enabled = false, username = null, password = null) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/games/minecraft/rtk', {
      'enabled': enabled,
      'username': username,
      'password': password
    }, success, failure);
  }

  setMcMyAdmin (success, failure, enabled = false, username = null, password = null, language = null) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/games/minecraft/mcmyadmin', {
      'enabled': enabled,
      'username': username,
      'password': password,
      'language': language
    }, success, failure);
  }

  createBackup (success, failure, world) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/games/minecraft/backup', {
      'world': world
    }, success, failure);
  }

  deleteBackup (success, failure, backup) {
    this.service.nitrapi.dataDelete('services/' + this.service.id + '/gameservers/games/minecraft/backup/' + backup, {}, success, failure);
  }

  restoreBackup (success, failure, backup) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/games/minecraft/backup/' + backup + '/restore', {}, success, failure);
  }

  switchVersion (success, failure, md5) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/games/minecraft/change_version', {
      'md5': md5
    }, success, failure);
  }

  getUUID (success, failure, username) {
    this.service.nitrapi.dataGet('services/' + this.service.id + '/gameservers/games/minecraft/uuid', {
      'username': username
    }, success, failure);
  }

  getAvatar (success, failure, username) {
    this.service.nitrapi.dataGet('services/' + this.service.id + '/gameservers/games/minecraft/avatar', {
      'username': username
    }, success, failure);
  }

  getPlugins (success, failure) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/games/minecraft/plugins', {}, success, failure);
  }
}

module.exports = Minecraft;
