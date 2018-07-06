const path = require('path');
const fs   = require('fs');

module.exports = function (instance) {
  'use strict';
  const twigExtend = (instance.extend) ? instance.extend : instance.exports.extend;

  twigExtend(function (Twig) {
    // Function `filecontent`: Read a file and return his content ad a string
    Twig.exports.extendFunction('filecontent', function (filepath) {
      const pathInfos = path.parse(this.path);
      const filefullpath = path.resolve(pathInfos.dir, filepath);
      const errorMessage = 'filecontent("' + filepath + '") File not found in `' + filefullpath + '`';
      let filecontent = '<!-- ' + errorMessage + ' -->';
      try {
        filecontent = fs.readFileSync(filefullpath).toString();
      } catch (e) {
        console.warn('HTML warning: ' + errorMessage);
      }
      return filecontent;
    });
  });
};
