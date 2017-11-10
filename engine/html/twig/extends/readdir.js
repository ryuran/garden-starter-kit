// readdir(dir)
// --------------------------------------------------------------------------
// Lit un dossier et renvoie les informations sur les fichiers
//
// Pour le paramètre `dir`, le dossier courrant `./` est le dossier source
// des gabarits Twig: `src/html` par defaut.
//
// Les informations retournées sont un tableau d'objet de la forme:
// {
//   path: le chemin complet du fichier à partir du fichier courrant
//   directory: le chemin complet du repertoir contenant le fichier à partir de ./
//   filename: le nom complet du fichier
//   basename: le nom du fichier sans extension
//   extension: l’extension du fichier commençant par '.'
// }

var path = require('path');
var glob = require('glob');

module.exports = function (Twig) {
  'use strict';

  Twig.exports.extendFunction('readdir', function (dir) {
    var fulldir = path.resolve(this.path, dir);
    var files   = glob.sync(path.join(fulldir, '**', '*.twig'));

    return files
      .map(function (file) {
        file = path.parse(file.replace(this.path, '.'));

        return {
          path: path.join(file.dir, file.base),
          directory: file.dir,
          filename: file.base,
          basename: file.base.replace(file.ext, ''),
          extension: file.ext
        };
      })
      .sort(function (a, b) {
        if (a.directory !== b.directory) {
          return a.directory.localeCompare(b.directory);
        }

        return a.filename.localeCompare(b.filename);
      });
  });
};
