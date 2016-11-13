'use strict';

class FileServer {
  constructor (service) {
    this.service = service;
  }

  uploadToken (success, failure, path, name) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/file_server/upload', {
      'path': path,
      'file': name
    }, success, failure);
  }

  uploadFile (success, failure, file, path, name) {
    // TODO
    failure('not yet implemented');
  }

  writeFile (success, failure, path, name, content) {
    // TODO
    failure('not yet implemented');
  }

  getFileList (success, failure, dir) {
    this.service.nitrapi.dataGet('services/' + this.service.id + '/gameservers/file_server/list', {
      'dir': dir
    }, success, failure);
  }

  doFileSearch (success, failure, dir, search) {
    this.service.nitrapi.dataGet('services/' + this.service.id + '/gameservers/file_server/list', {
      'dir': dir,
      'search': search
    }, success, failure);
  }

  downloadToken (success, failure, file) {
    this.service.nitrapi.dataGet('services/' + this.service.id + '/gameservers/file_server/download', {
      'file': file
    }, success, failure);
  }

  downloadFile (success, failure, file, path, name) {
    // TODO
    failure('not yet implemented');
  }

  readPartFromFile (success, failure, file, offset = 0, cound = null) {
    // TODO
    failure('not yet implemented');
  }

  readFile (success, failure, file) {
    // TODO
    failure('not yet implemented');
  }

  deleteFile (success, failure, file) {
    this.service.nitrapi.dataDelete('services/' + this.service.id + '/gameservers/file_server/delete', {
      'path': file
    }, success, failure);
  }

  statFiles (success, failure, files) {
    this.service.nitrapi.dataGet('services/' + this.service.id + '/gameservers/file_server/stat', {
      'files': files
    }, success, failure);
  }

  pathSize (success, failure, path) {
    this.service.nitrapi.dataGet('services/' + this.service.id + '/gameservers/file_server/size', {
      'path': path
    }, success, failure);
  }

  deleteDirectory (success, failure, directory) {
    this.deleteFile(success, failure, directory);
  }

  moveFile (success, failure, sourceFile, targetDir, fileName) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/file_server/move', {
      'source_path': sourceFile,
      'target_path': targetDir,
      'target_filename': fileName
    }, success, failure);
  }

  moveDirectory (success, failure, source, target) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/file_server/move', {
      'source_path': source,
      'target_path': target
    }, success, failure);
  }

  copyFile (success, failure, sourceFile, targetDir, fileName) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/file_server/copy', {
      'source_path': sourceFile,
      'target_path': targetDir,
      'target_filename': fileName
    }, success, failure);
  }

  copyDirectory (success, failure, source, target) {
    this.copyFile(success, failure, source, target);
  }

  createDirectory (success, failure, path, name) {
    this.service.nitrapi.dataPost('services/' + this.service.id + '/gameservers/file_server/mkdir', {
      'path': path,
      'name': name
    }, success, failure);
  }

}

module.exports = FileServer;
