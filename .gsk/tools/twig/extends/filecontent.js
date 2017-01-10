/* jshint node:true */

var path = require('path');
var fs   = require('fs');
var ENV  = require('../../env.js').html;

module.exports = function (Twig) {
  'use strict';

  // Fonction `filecontent` : Lit un fichier et renvoit sont contenu sous forme de string
  Twig.exports.extendFunction('filecontent', function (filepath) {
    var filefullpath = path.resolve(ENV['src-dir'], filepath);
    var filecontent = '';
    try {
      filecontent = fs.readFileSync(filefullpath).toString();
    } catch (e) {
      console.error(e.message);
    }
    return filecontent;
  });
};
