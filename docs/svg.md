
SVG: symbols
===============================================================================

The Garden Starter Kit can import a collection of svg symbols in html.

You can find more informations in [the css-tricks article about this subject](https://css-tricks.com/svg-symbol-good-choice-icons/).


Settings
-------------------------------------------------------------------------------

```json
  "svg": {
    "src-dir"  : "./src/assets/svg/symbols",
    "dest-dir" : "./src/assets/svg",
    "id-prefix": "symbol",
    "dest-file": "symbols"
  },
```

Your icons SVG files will be in the `src-dir` directory.
The `gulp svg` task will transform it to a colection in the `dest-file`.svg built in the `dest-dir` directory.

Symbols’s `id` will be prefixed by `id-prefix` and composed by the path from `src-dir`.

With default settings for the source file `./src/assets/svg/symbols/animals/fish.svg` we will optain a svg symbole with `symbols-animals-fish` as id in the `./src/assets/svg/symbol.svg` file.


Use
-------------------------------------------------------------------------------

Put clean and optimized SVG files in the source directory, then run `gulp svg` task.

__You have to run HTML build to update symbols collection in html files (same for docs)__

`gulp watch` or `gulp live` command watch add or edit for SVG sources to regenerate html and docs.

