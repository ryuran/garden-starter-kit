
Twig
===============================================================================

At Clever Age many project are based on Symfony or Drupal, so we use
[Twig](http://twig.sensiolabs.org/) ad default templating language to build
our HTML static pages (via `twig.js`).

Settings:
```json
{
  "html": {
    "engine": "twig",
  }
}
```

Standard settings
-------------------------------------------------------------------------------

Twig does not need specific settings. Furthermore, by default, every variables
used to fill templates while the complitation are in `src/data` directory as
json files.

Data from the main file (`src/data/data.json`) are overrided by a specific file
named with the same name than the twig file.

Exemple: the template `src/html/mon/fichier.twig` will be filled by data from `src/data/data.json` and `src/data/mon/fichier.json` merged over it.

Extend Twig
-------------------------------------------------------------------------------
As well as the PHP version, Twig.js can be extended permet d’étendre Twig.

To add a Twig tag, function or filter, you have to write a CommonJS module in this directory:
* `tools/twig/tags/` to add a tag
* `tools/twig/functions/` to add a function
* `tools/twig/filters/` to add a filter

For functions and filters, the module must export an object:

```javascript
module.exports = {
  name: 'leNomDeMaFonctionOuFiltre',
  func: function (args) {
    return 'leResultatDeMaFonctionOuFiltre';
  }
};
```

For tags, your module must export a function with Twig as argument.
This object give you access to entire Twig.js internal API to add a tag.
We can’t hide it, [it’s not trivial](https://github.com/justjohn/twig.js/wiki/Extending-twig.js-With-Custom-Tags).

The exported function will be used by `Twig.extend`.

```javascript
module.exports = function (Twig) {
  // Be brave :-/
};
```

To see some exemples you can give a look to [tools/twig](../../tools/twig).

