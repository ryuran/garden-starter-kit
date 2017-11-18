var path = require('path');
var fs   = require('fs');

module.exports = function (instance) {
  'use strict';
  var twigExtend = (instance.extend) ? instance.extend : instance.exports.extend;

  twigExtend(function (Twig) {
    // Function `filecontent`: Read a file and return his content ad a string
    Twig.exports.extendFunction('filecontent', function (filepath) {
      var pathInfos = path.parse(this.path);
      var filefullpath = path.resolve(pathInfos.dir, filepath);
      var errorMessage = 'filecontent("' + filepath + '") File not found in `' + filefullpath + '`';
      var filecontent = '<!-- ' + errorMessage + ' -->';
      try {
        filecontent = fs.readFileSync(filefullpath).toString();
      } catch (e) {
        console.warn('HTML warning: ' + errorMessage);
      }
      return filecontent;
    });
  });
};
