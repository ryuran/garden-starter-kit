'use strict';

var process = require('process');
var path    = require('path');

function parser(rules) {
  var argv   = process.argv.slice(2);
  var output = {};
  var prev, key;

  argv.forEach(function (value) {
    var t, k, v;

    if (value.indexOf('=') > -1) {
      t = value.split('=');
      k = t[0];
      v = t[1];
    } else {
      k = value;
      v = true;
    }

    if (k in rules) {
      output[k] = v;
      prev = k;
    }

    else if (value.indexOf('-') !== 0 && prev in output) {
      output[prev] = value;
    }
  });

  for (key in rules) {
    if (rules.hasOwnProperty(key)) {
      if (!(key in output)) {
        output[key] = '';
      }

      if (rules[key] === 'boolean') {
        output[key] = !!output[key];
      }

      else if (rules[key] === 'string') {
        output[key] = String(output[key]).replace(/^(?:"|')?(.*)(?:"|')?$/, '$1');
      }

      else if (rules[key] === 'filename') {
        output[key] = path.normalize(output[key]);
      }
    }
  }

  return output;
}

module.exports = {
  parse: parser
};
