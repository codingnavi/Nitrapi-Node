'use strict';

class Teamspeak3 {
  constructor (service) {
    this.service = service;
  }

  status (success, failure, showIcons = false) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/voiceservers/teamspeak3/status', showIcons ? {
      'show_icons': true
    } : {}, success, failure);
  }

  icon (success, failure, iconId) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/voiceservers/teamspeak3/icon', {
      'icon_id': iconId
    }, success, failure);
  }

  getWhitelist (success, failure) {
    this.service.nitrapi.dataGet('services/' + this.service.id + '/voiceservers/whitelist', {}, success, failure);
  }

  addWhitelist (success, failure, ip, comment) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/voiceservers/whitelist', {
      'ip': ip,
      'comment': comment
    }, success, failure);
  }

  deleteWhitelist (success, failure, ip) {
    this.service.nitrapi.dataDelete('services/' + this.service.id + '/voiceservers/whitelist', {
      'ip': ip
    }, success, failure);
  }

  enableLogView (success, failure, group) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/voiceservers/teamspeak3/enable_log_view', {
      'group': group
    }, success, failure);
  }

  cleanupUsers (success, failure, group, days) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/voiceservers/teamspeak3/cleanup_users', {
      'group': group,
      'days': days
    }, success, failure);
  }

  info (success, failure, ip, comment) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/voiceservers/teamspeak3/info', {}, success, failure);
  }

  query (success, failure, commands) {
    // TODO
    failure('not yet implemented');
  }

  addGroup (success, failure, name) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/voiceservers/teamspeak3/group', {
      'name': name
    }, success, failure);
  }

  deleteGroup (success, failure, id) {
    this.service.nitrapi.dataDelete('services/' + this.service.id + '/voiceservers/teamspeak3/group', {
      'sgid': id
    }, success, failure);
  }

  addToken (success, failure, groupId) {
    this.service.nitrapi.dataGet('services/' + this.service.id + '/voiceservers/teamspeak3/token', {
      'sgid': groupId
    }, success, failure);
  }

  deleteToken (success, failure, token) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/voiceservers/teamspeak3/token', {
      'token': token
    }, success, failure);
  }

  getHostsystems (success, failure) {
    this.service.nitrapi.dataGet('services/' + this.service.id + '/voiceservers/teamspeak3/servers', {}, success, failure);
  }

  doSwitch (success, failure, hostname) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/voiceservers/teamspeak3/switch', {
      'server': hostname
    }, success, failure);
  }
}

module.exports = Teamspeak3;
