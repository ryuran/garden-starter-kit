Garden Boilerplate
================================================================================

Ce dépôt GIT sert de référence comme boilerplate de projet pour Garden.

Ils contient toutes nos bonnes pratiques et tous les outils necessaires pour
démarrer un projet d'intégration statique chez Clever Age. Parmis tous les
outils présents dans ce boilerplate vous trouverez ceux qui doivent être
utilisé obligatoirement et ceux qui sont simplement recommandés.

Chaque outil utilisé dispose d'une documentation dédiée sur la façon de
l'utiliser dans notre context. Cette documentation est rédigée au format
Markdown et disponible dans le repertoire `docs` de ce dépôt.


Setup projet
--------------------------------------------------------------------------------
Pour démarrer un nouveau projet, suivez simplement les instructions suivantes.

## Vérifiez votre environnement
Tous nos projet présuposent que votre environnement dispose des outils suivant,
installés au niveau global sur votre machine

* [Git](http://git-scm.com/)
* [NodeJS](http://nodejs.org/)
* [Ruby](https://www.ruby-lang.org/fr/)
* [Rubygems](http://rubygems.org/)
* [Bundler](http://bundler.io/)
* [Grunt CLI](http://gruntjs.com/getting-started)

Dans la mesure ou vous êtes sous Mac, vous devez obligatoirement installer XCode
et les outils en ligne de commande qui l'accompagne (ce qui installera
automatiquement Ruby et Rubygems).

Il est également recommandé d'installer et d'utiliser [Homebrew](http://brew.sh/)
pour installer tous les outils en ligne de commande dont vous pourriez avoir
besoin.

## Démarrez votre projet
Vous avez deux options pour démarrer votre projet:

1. télécharger le contenu de ce dépôt et l'utiliser comme base de démarrage
2. Cloner ce dépot avec GIT (voir ci-après)

Une fois que vous avez récupéré le contenu de ce dépôts, vous pouvez
eventuellement ajouter les outils recommandés ci-après.

Enfin, une fois que vous êtes près a travailler, exécutez les commandes
suivantes :

```bash
$ bundle install
$ npm install
```

### Cloner le boilerplate avec GIT
Si vous le souhaitez, vous pouvez directement cloner ce dépot avec GIT.
Si vous choisissez cette option, cela vous permet de garder le lien avec ce
dépot. Ça peut être utile si vous voulez pouvoir récupérer des mise à jour de
ce boiler plat après coup. *ATTENTION:* _En l'état c'est assez risqué et il est
recommandé de supprimer la branche distante liée à ce dépot une fois que vous
avez cloné le dépôt._

Le plus simple:

```bash
$ cd ~/monProjet
$ git clone git@example.com:project-name.git
$ git remote remove origin
```

Il ne vous reste plus qu'a ajouter une nouvelle `origin` vers le dépot définif
des sources du projet final.


Outils obligatoires
--------------------------------------------------------------------------------
Les outils listés ici doivent êtres utilisés obligatoirement lorsqu'on démarre
un nouveau projet d'intégration. _Le seul cas ou on ne les utilisera pas sera
lorsqu'on aura une demande explicite du client pour utiliser autre chose._

* [*Grunt*](docs/grunt.md)
* [*Sass*](docs/sass.md)


Outils recommandés
--------------------------------------------------------------------------------
Les outils listés ci-après sont des recommandations. Il peuvent apporter des
fonctionnalités originales ou en cours d'experimentation. Vous êtes libre de
les utilisés ou non selon vos envies ou votre contexte projet.

* [*Compass*](docs/compass.md)
* [*Bower*](docs/bower.md)