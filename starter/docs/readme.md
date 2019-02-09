Project documentation
===============================================================================

Every files in MarkDown format (with `.md` extension) present in the `docs` directory will be converted to HTML files and added to project documentation for each build.

There is two important things to know:

* Documentation is not generated for optimized build.
* Links to other markdown files (with `.md` extension) are automaticaly transformed
  into links to corresponding HTML file. By this way, relative links of the documentation can be followed as well in HTML version than in gitlab, github or bitbucket interface.
