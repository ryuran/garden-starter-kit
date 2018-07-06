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

const path = require('path');
const glob = require('glob');

module.exports = function (instance) {
  'use strict';
  const twigExtend = (instance.extend) ? instance.extend : instance.exports.extend;

  twigExtend(function (Twig) {
    Twig.exports.extendFunction('readdir', function (dir) {
      const root = path.dirname(this.path);
      const fulldir = path.resolve(root, dir);
      const files = glob.sync(path.join(fulldir, '**', '*.twig'));

      return files
        .map((file) => {
          const filePath = path.parse(path.relative(root, file));

          return {
            path: path.join(filePath.dir, filePath.base),
            directory: filePath.dir,
            filename: filePath.base,
            basename: filePath.base.replace(filePath.ext, ''),
            extension: filePath.ext,
          };
        })
        .sort((a, b) => {
          if (a.directory !== b.directory) {
            return a.directory.localeCompare(b.directory);
          }

          return a.filename.localeCompare(b.filename);
        });
    });
  });
};
