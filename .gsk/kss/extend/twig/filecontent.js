/* jshint node:true */

var path = require('path');
var fs   = require('fs');
var ENV  = require('../../../tools/env.js').html;

module.exports = function (Twig) {
  'use strict';

  var filecontent = require('../../../tools/twig/functions/filecontent.js');
  // Fonction `filecontent` : Lit un fichier et renvoit sont contenu sous forme de string
  Twig.extendFunction(filecontent.name, filecontent.func);
};
