
JS: Webpack
===============================================================================

To manage script bundles in our project we choose Webpack, it allows to:

* Manage modules
* Manage dependancies from NPM
* Use ES6 syntaxe in your scripts

Settings:
```json
{
  "js": {
    "engine": "webpack"
  }
}
```

Standard settings
-------------------------------------------------------------------------------

### Entry files

Entry fils are by default every javascript files (`*.js`) at root of `src/js` directory.
Corresponding output files will be named by the same name.

### Node modules

To use node modules (as jQuery), you have to install them with NPM (with `--save` option to save it in `package.json`) :

```bash
npm i jquery moment --save
```

To use it, you can use `import` syntaxe from ES6 (recommanded) or CommomJS `require()` function.

### Babel and ES6

By default, webpack use [Babel](http://babeljs.io/) to compile ES6 to browser compatible javascript. If you want Babel can do more (for exemple compile React JSX syntaxe), you have to install [some plugins](http://babeljs.io/docs/plugins/).

```bash
npm i babel-react --save-dev
```

### Advanced use

For advanced settings, you can edit `webpack-config.js` file.
You will find more informations on [official documentation](https://webpack.js.org/configuration/).
