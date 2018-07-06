'use strict';

const log = require('fancy-log');
const color = require('ansi-colors');

module.exports = function err(error) {
  log(color.red('ERROR:'), error.plugin);

  if (error.stack) {
    error.stack.split('\n').forEach(function (line) {
      log(color.red('STACK:'), line);
    });
  } else {
    log(color.red('ERROR:'), error.message);
  }

  this.emit('end');
};
