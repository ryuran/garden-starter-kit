
Import: to import external files in build directory
===============================================================================

The Garden Starter Kit have a simple task to copy some files to build directory.

It can be useful by exemple to copy an asset from a NPM dependence.


Settings
-------------------------------------------------------------------------------

```json
  "import": {
    "fontAwesome": {
      "src"      : "./node_modules/font-awesome/fonts/*-webfont.*",
      "dest-dir" : "./build/fonts/font-awesome"
    },
    "jQueryUI": {
      "src"      : "./node_modules/jquery-ui/themes/base/images/*",
      "dest-dir" : "./build/img/jquery-ui"
    }
  },
```

It this exemple, the first part named `fontAwesome` will copy font files from NPM dependence `font-awesome` in the directory `fonts/font-awesome` in the build directory.

The second part `jQueryUI` will copy images from NPM dependence `jquery-ui` in the directory `img/jquery-ui` in the build directory.


Use
-------------------------------------------------------------------------------

The command `gulp import` will run all imports.

Furthermore, a task to each entry of settings will be available.

For exemple, with the previous settings, `gulp import:fontAwesome` and `gulp import:jQueryUI` will be available.
