// readdir(dir)
// --------------------------------------------------------------------------
// Lit un dossier et renvoie les informations sur les fichiers
//
// Pour le paramètre `dir`, le dossier courrant `./` est le dossier source
// des gabarits Twig: `src/html` par defaut.
//
// Les informations retournées sont un tableau d'objet de la forme:
// {
//   path      : le chemin complet du fichier à partir de ./
//   directory : le chemin complet du repertoir contenant le fichier à partir de ./
//   filename  : le nom complet du fichier
//   basename  : le nom du fichier sans extension
//   extension : l'extension du fichier commençant par '.'
// }

var path = require('path');
var glob = require('glob');
var ENV  = require('../../env.js').html;

module.exports = {
  name: 'readdir',
  func: function (dir) {
    var fulldir = path.resolve(ENV['src-dir'], dir);
    var files   = glob.sync(path.join(fulldir, '**/*.*'));

    return files
      .map(function (file) {
        file = path.parse(path.join(dir, path.basename(file)));

        return {
          path     : path.join(dir, file.base),
          directory: file.dir,
          filename : file.base,
          basename : file.base.replace(file.ext, ''),
          extension: file.ext
        };
      })
      .sort(function (a, b) {
        if (a.dir === b.dir) {
          return a.dir.localeCompare(b.dir);
        }

        return a.filename.localeCompar(b.filename);
      });
  }
};
