
Linters
===============================================================================

Linters are tools to control code quality. The Garden Starter Kit,
is setted to lint systematically JavaScript and CSS sources.


Settings
-------------------------------------------------------------------------------
Each linter have a default settings file in `starter/` directory.
Gulp use automaticaly the config file existing at the project root.

You can define your own rules. However, avoid to change settings as soon as the
project it started.


Use
-------------------------------------------------------------------------------
Each time gulp will process a file, it run the corresponding linter.
Linting errors are listed in your console.
You should not commit your work as long as there are lint errors.

You should set your IDE or code editor to highlight linting errors with
local settings.

* [Sublime Text](https://packagecontrol.io/packages/SublimeLinter)
* [WebStorm](https://www.jetbrains.com/webstorm/help/code-quality-tools.html)
* [Atom](https://github.com/AtomLinter)
* [VScode](https://marketplace.visualstudio.com/search?target=VSCode&category=Linters)


Available linters
-------------------------------------------------------------------------------
The starter kit is currently configured to use these linters:

* JavaScript
  * ESLint
    * Homepage: http://eslint.org
    * Rules: http://eslint.org/docs/rules/
* Sass (node-sass)
  * sass-lint
    * Homepage: https://github.com/sasstools/sass-lint
    * Rules: https://github.com/sasstools/sass-lint/tree/master/docs/options
* LESS
  * lesshint
    * Homepage: https://github.com/lesshint/lesshint
    * Rules: https://github.com/lesshint/lesshint/blob/master/lib/linters/README.md
* Stylus
  * Stylint
    * Homepage & Rules: https://rosspatton.github.io/stylint/
