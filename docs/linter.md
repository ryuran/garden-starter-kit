
Linter
================================================================================

Les Linters sont des outils qui vérifient la qualité du code. Dans le starter kit,
2 linters sont en place : Javascript et Sass


Linter Javascript : JSHint
--------------------------------------------------------------------------------

[JSHint](http://jshint.com/) vérifie la qualité du code Javascript.

Il est possible de surcharger les règles par défaut via le fichier *.jshint*.
Pour voir les options possibles, c'est [ici](http://jshint.com/docs/options/).

Certains editeurs, tels que [Sublime](http://www.sublimetext.com/), sont capables
de lire cette configuration et de verifier le linting à la demande. Voir la [liste
des plugins disponibles](http://www.jshint.com/install/).

Voici quelques unes des options choisies :

``` "strict" : true ```

On force l'utilisation du [Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode), qui permet notamment une meilleure gestion des erreurs.

``` "evil" : false ```

On empêche l'utilisation de la fonction ```eval``` car elle contient des vulnérabilités.

 ``` "eqeqeq" : true ```

Lors de comparaison via ```==```, on force l'utilisation de ```===``` (comparaison stricte). Cela est d'une part plus performant, et d'autre part permet d'éviter des résultats inatendus.


Linter Sass : SCSS-Lint
--------------------------------------------------------------------------------

[SCSS-Lint](https://github.com/causes/scss-lint) vérifie la qualité du code Sass.

Il est possible de surcharger les règles par défaut via le fichier *.scss-lint.yml*.
Pour voir les options possibles, c'est [ici](https://github.com/causes/scss-lint/blob/master/lib/scss_lint/linter/README.md).

Les settings utilisé sur le starter-kit sont adapté de [scss-lint-w3c](https://github.com/kaelig/scss-lint-w3c).

Certains editeurs, tels que [Sublime text 3](http://www.sublimetext.com/3), sont
capables de lire cette configuration et de verifier le linting à la demande.
[Documentation du plugin Sublime](https://sublime.wbond.net/packages/SublimeLinter-contrib-scss-lint)
