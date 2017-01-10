// filecontent(path)
// --------------------------------------------------------------------------
// Lit un fichier et renvoit sont contenu sous forme de string
//
// Pour le paramètre `path`, le dossier courrant `./` est le dossier source
// des gabarits Twig: `src/html` par defaut.

var path = require('path');
var fs   = require('fs');
var ENV  = require('../../env.js').html;

module.exports = {
  name: 'filecontent',
  func: function (filepath) {
    var filefullpath = path.resolve(ENV['src-dir'], filepath);
    var filecontent = fs.readFileSync(filefullpath).toString();
    return filecontent;
  }
};
