module.exports = function (Twig) {
  'use strict';

  var path = require('path');

  Twig.extend(function (Twig) {
    var folderPath = path.resolve(process.cwd(), './node_modules/@cleverage/gsk-twig/extends');
    require('fs').readdirSync(folderPath).forEach(function(file) {
      require(path.join(folderPath, file))(Twig);
    });
  });
};
