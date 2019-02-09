
KSS
===============================================================================

[KSS](http://warpspire.com/kss/) is a documentation standard for styles.
It’s based on structured comments to generate a style guide.

Here we use node version of kss [kss-node](http://kss-node.github.io/kss-node/).

To build KSS styleguide, run: `npm run styleguide`.


Settings
-------------------------------------------------------------------------------

KSS settings are in the `kss.json` file:

```json
{
  // Directory where sources are.
  // (this path is relative to the kss.js file)
  "source": "./src/css",

  // The style guide homepage in markdown
  // (this path is relative to the source directory)
  "homepage": "README.md",

  // Diretory to build the styleguide
  // (this path is relative to the kss.js file)
  "destination": "./build/doc/styleguide",

  // Path to the builder
  // (resolved as commonJS `require`)
  "builder": "@cleverage/gsk/kss",
  "custom": [],

  // CSS files to import in the style guide
  // (Paths are URL relative from built style guide)
  "css": [
    "../../css/doc.css",
    "../../css/styles.css",
  ],

  // js files to import in the style guide
  // (Paths are URL relative from built style guide)
  "js" : []
};
```
