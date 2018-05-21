// json(path)
// --------------------------------------------------------------------------
// Lit le fichier JSON en paramètre et renvoie l’objet correspondant
//
// Pour le paramètre `path`, le dossier courrant `./` est le dossier source
// des données des gabarits Twig: `src/data` par defaut.

const fs    = require('fs');
const path  = require('path');
const log = require('fancy-log');
const color = require('ansi-colors');

module.exports = function (instance) {
  'use strict';
  const twigExtend = (instance.extend) ? instance.extend : instance.exports.extend;

  twigExtend(function (Twig) {
    Twig.exports.extendFunction('json', function (file) {
      let data = {};

      if (!(typeof file === 'string' || file instanceof String)) {
        log(color.red('ERROR:'),
          'Wrong file path:', file,
          '(check your "json(path)" syntax)'
        );

        return data;
      }

      const fullpath = path.resolve(this.path, file);

      try {
        data = JSON.parse(fs.readFileSync(fullpath, 'utf8'));
      } catch (e) {
        log(color.yellow('WARN:'),
          'Unable to find data from',
          fullpath.replace(path.resolve('.'), '').slice(1)
        );
      }

      return data;
    });
  });
};
