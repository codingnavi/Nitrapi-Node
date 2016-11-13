'use strict';

class CustomerSettings {
  constructor (service) {
    this.service = service;
    this.settings = service.settings;
  }

  readSetting (success, failure, category = null, key = null) {
    if (category !== null && !this.hasCategory(category)) {
      failure('Category ' + category + ' not found');
      return;
    }

    if (key !== null && !this.hasSetting(category, key)) {
      failure('Setting ' + key + ' in category ' + category + ' not found');
      return;
    }

    if (category !== null && key !== null) {
      success(this.settings[category][key]);
      return;
    }

    if (category !== null) {
      success(this.settings[category]);
      return;
    }

    success(this.settings);
  }

  writeSetting (success, failure, category, key, value) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/settomgs', {
      'category': category,
      'key': key,
      'value': value
    }, success, failure);
  }

  getConfigSets (success, failure) {
    this.service.nitrapi.dataGet('services/' + this.service.id + '/gameservers/settings/sets', {}, success, failure);
  }

  restoreConfigSet (success, failure, id) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/settings/sets/' + id + '/restore', {}, success, failure);
  }

  deleteConfigSet (success, failure, id) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/settings/sets/' + id, {}, success, failure);
  }

  createConfigSet (success, failure, name = null) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/settings/sets', {
      'name': name
    }, success, failure);
  }

  resetSettings (success, failure) {
    this.service.nitrapi.dataDelete('services/' + this.service.id + '/gameservers/settings/', {}, success, failure);
  }

  hasCategory (category) {
    return typeof this.settings[category] !== 'undefined';
  }

  hasSetting (category, key) {
    if (!this.hasCategory(category)) {
      return false;
    }

    return typeof this.settings[category][key] !== 'undefined';
  }
}

module.exports = CustomerSettings;
