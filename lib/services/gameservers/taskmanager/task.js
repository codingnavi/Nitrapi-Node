'use strict';

class Task {
  constructor (taskmanager, data) {
    this.taskmanager = taskmanager;
    this.loadData(data);
  }

  loadData (data) {
    for (var name in data) { // copy old data attributes
      if (data.hasOwnProperty(name)) {
        this[name] = data[name];
      }
    }
  }

  reloadData (success, failure) {
    this.taskmanager.service.nitrapi.dataGet('services/' + this.taskmanager.service.id + '/gameservers/tasks', {}, function (data) {
      for (var name in data.tasks) {
        var task = data.tasks[name];
        if (task.id === this.id) {
          this.loadData(task);
          break;
        }
      }
    }, failure);
  }
}

module.exports = Task;
