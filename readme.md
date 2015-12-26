
Clever Garden Starter Kit
===============================================================================

Ce dépôt GIT sert de kit de démarrage pour les projets d'intégration statique.

Ils contient toutes nos bonnes pratiques et tous les outils nécessaires pour
nos projets d'intégration statique chez Clever Age. Parmi tous les outils
présents dans ce kit vous trouverez ceux qui doivent être utilisés
obligatoirement aussi bien que ceux qui sont simplement recommandés.

Chaque outil utilisé dispose d'une documentation dédiée sur la façon de
l'utiliser dans notre contexte. Cette documentation est rédigée au format
Markdown et est disponible dans le répertoire `.gsk/docs` de ce dépôt.


Créer un nouveau projet
-------------------------------------------------------------------------------
Pour créer un nouveau projet, suivez simplement les instructions ci-après.

> __NOTE:__ _Il s'agit ici des instructions manuel à suivre. Cependant, à terme
  il est prévus qu'un installer soit disponible pour simplifier le démarage_

## Vérifiez votre environnement
Tous nos projets pré-supposent que votre environnement dispose des outils
suivant installés au niveau global sur votre machine :

* [Git](http://git-scm.com/)
* [NodeJS](http://nodejs.org/)
* [Ruby](https://www.ruby-lang.org/fr/)
* [Rubygems](http://rubygems.org/)
* [Bundler](http://bundler.io/)

> Pour **Mac** : _vous devez obligatoirement installer XCode et les outils en
  ligne de commande qui l'accompagne (ce qui installera automatiquement Ruby et
  Rubygems). Il est également recommandé d'installer et d'utiliser
  [Homebrew](http://brew.sh/) pour installer tous les outils en ligne de
  commande dont vous pourriez avoir besoin._

> Pour **Windows** : _un des modules installé par Bundle nécessite une
  compilation en C. Pour cela, installez le Ruby Development Kit en suivant
  [ces instructions](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)._

> Pour **Linux** : _Chaque distribution a ses propre prérequis. Par exemple,
  Linux Mint 16 à besoin de `ruby1.9.1-beta`_

Afin de pouvoir utiliser facilement les commandes fournis par npm, installées
dans votre répertoire projet, il est recommandé de rajouter
`./node_modules/.bin` a votre `PATH`.

Pour Mac/Linux, rajouter la ligne suivante dans votre fichier `~/.profile`
(Mac), `~/.bash_rc` (Linux) ou tout autre fichier de configuration
correspondant à votre shell, pour que le changement soit effectif à chaque
lancement de votre terminal.

```
export PATH="./node_modules/.bin:$PATH"
```

## Démarrez votre projet
Vous avez deux options pour démarrer votre projet:

1. [Télécharger](https://git.clever-age.net/clever-age-expertise/clever-garden-starter-kit/repository/archive.zip?ref=master) le contenu de ce dépôt et l'utiliser comme base de démarrage
2. Cloner ce dépôt avec GIT (voir ci-après)

### Cloner le kit de démarrage avec GIT
Si vous le souhaitez, vous pouvez directement cloner ce dépôt avec GIT.

Le plus simple:

```bash
$ cd ~/monProjet
$ git clone git@git.clever-age.net:clever-age-expertise/clever-garden-starter-kit.git .
$ rm -rf .git
```

Il ne vous reste plus qu'à initialiser le dépôt git de votre projet et commiter
le starter kit que vous avez récupérer pour commencer votre projet:

```bash
$ git init
$ git add --all
$ git commit -m "First commit"
$ git remote add origin <URL-de-votre-depot-git>
$ git push -u origin master
```

Lors du démarrage de votre projet et à chque fois que le dépôt est rapatrié en
local, exécutez les commandes suivantes :

```bash
$ bundle install --path .gems
$ npm install
```

## Organisation des fichiers
Pour harmoniser notre travail, tous les projets utiliseront la structure de
fichiers suivante.

Les sources sur lesquelles nous travaillons sont toutes dans le répertoire
`src`. _Normalement, seuls les fichiers présents dans ce répertoire devraient
être modifiés après le début du projet_.

* `/src`
* `/src/css`: L'ensemble des fichiers qui produiront du CSS
* `/src/js`: L'ensemble des sources JavaScript du projet
* `/src/assets`: L'ensemble des fichiers qui doivent être utilisé par le projet tel quel.
* `/src/assets/img`: L'ensemble des images d'interface du projet
* `/src/assets/sprites`: L'ensemble des images d'interface qui seront regroupées en sprites
* `/src/assets/fonts`: L'ensemble des fontes utilisées par le projet
* `/src/html`: L'ensemble des gabarits qui produiront du HTML
* `/src/data`: Les fichiers JSON de données à injecter dans les gabarits HTML ou autre
* `/src/docs`: L'ensemble de la documentation statique du projet au format Markdown

A chaque fois que le projet est "construit", le résultat est disponible dans
les répertoires suivant:

* `/build`
* `/build/doc`: Toute la documentation du projet au format HTML


Taches normalisées
-------------------------------------------------------------------------------

Tous projet démarré avec ce starter kit dispose d'un certain nombre de taches
Gulp normalisés utilisable quelques soient les modules Gulp utilisés.

**live**: permet de démarrer un serveur statique pour les pages HTML et d'avoir
un _watch_ sur les fichiers du projet en même temps.

> **ATTENTION:** _Même si tous les chemins sont résolus de manière relative, il
  est vivement conseillé de préférer cette méthode à tout autre serveur local
  que vous pourriez utiliser. De cette manière vous verrez toujours votre site
  "à la racine". Votre site répondra sur l'URL: http://localhost:8000_

```bash
$ gulp live

# Pour ne pas être embêté par les tests,
# vous pouvez lancer le live en mode relax
# (Mais c'est mal et vous le savez)
$ gulp live --relax
```

**build**: construit la version statique du projet (compile les fichiers Sass,
assemble les fichiers HTML, etc.)

```bash
$ gulp build

# Pour créer un build optimisé pour la prod
# (Fichiers minifiés, pas de doc, etc)
$ gulp build --optimize
```

**css**: Construit les feuilles de styles

```bash
$ gulp css
```

**html**: Construit les pages HTML statiques

```bash
$ gulp html
```

**js**: Construit les fichiers JS

```bash
$ gulp js
```

**assets**: Déplace et optimise les assets statique du projet

```bash
$ gulp assets
```

**doc**: Génère la documentation du projet

```bash
$ gulp doc
```

**test**: Exécute tous les tests du projet

```bash
$ gulp test
```

Outils utilisé
-------------------------------------------------------------------------------
Les outils listés ici doivent êtres utilisés obligatoirement lorsqu'on démarre
un nouveau projet d'intégration. Il garantisse un workflow de travail optimal

* [Gulp](.gsk/docs/gulp.md)
* [Linter](.gsk/docs/linter.md)

Les outils listés ci-après sont à utiliser et configurer pour votre projet.
Ils sont tous utilisable tel quel, mais le starter kit est suffisamment flexible
pour s'adapter à vos besoins. Le choix d'utilisation de ces outils se fait via
le fichier `.gsk/config.json`, voir les [instructions de configuration](.gsk/readme.md)

### CSS
* [Sass/compass](.gsk/docs/css/sass.md)
* [Stylus](.gsk/docs/css/stylus.md)
* [LESS](.gsk/docs/less.md)

### HTML
* [Twig](.gsk/docs/html/twig.md)
* [Handlebars](.gsk/docs/html/handlebars.md)

### JavaScript
* [Simple pipeline](.gsk/docs/js/simple.md)
* [Browserify + NPM](.gsk/docs/js/browserify.md)

### Documentation
* [Documentation statique](docs/index.md)
* [KSS](.gsk/docs/kss.md)
