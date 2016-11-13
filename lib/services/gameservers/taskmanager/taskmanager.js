'use strict';

var Task = require('./task.js');

class TaskManager {
  constructor (service) {
    this.service = service;
    this.reloadTasks();
  }

  persistTask (success, failure, task) {
    var url = 'services/' + this.service.id + '/tasks';
    if (task.id !== null) {
      url += '/' + task.id;
    }

    this.service.nitrapi.dataPost(url, {
      'minute': task.minute,
      'hour': task.hour,
      'day': task.day,
      'month': task.month,
      'weekday': task.weekday,
      'action_method': task.actionMethod,
      'action_data': task.actionData
    }, function (data) {
      this.reloadTasks();
      success(data);
    }, failure);
  }

  deleteTask (success, failure, task) {
    if (task.id === null) {
      failure('This is not a persistent task, no delete needed');
      return;
    }
    this.service.nitrapi.dataDelete('services/' + this.service.id + '/gameservers/tasks/' + task.id, {}, function (data) {
      task.id = null;
      success(data);
    }, failure);
  }

  reloadTasks () {
    this.service.nitrapi.dataGet('services/' + this.service.id + '/gameservers/tasks', {}, function (data) {
      this.tasks = [];
      for (var name in data.tasks) {
        var task = data.tasks[name];
        this.tasks[task.id] = new Task(this, task);
      }
    }, function () {});
  }
}

module.exports = TaskManager;
