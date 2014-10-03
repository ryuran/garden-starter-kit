Grunt
================================================================================

Pour tous nos projets, nous automatisons les taches répétitives à l'aide de
[Grunt](http://gruntjs.com/)

> *NOTE :* _L'utilisation d'autres outils d'automatisation des taches n'est
  autorisé que si le client en fait une demande explicite_


Vérifier votre environnement
--------------------------------------------------------------------------------

Grunt repose sur [NodeJS](http://nodejs.org/), assurez vous que vous l'avez bien
installé sur votre environnement.

Il est également nécessaire d'installer l'utilitaire Grunt CLI dans votre
environnement global (cela vous permet d'accéder à la commande `grunt` dans
votre terminal).

Si ce n'est pas déjà le cas, exécutez simplement la commande suivante:

```bash
$ sudo npm install -g grunt-cli
```

Nous vous recommandons également de prendre le temps de lire l'article
"[Getting Started](http://gruntjs.com/getting-started)" sur le site officiel du
projet.


Configuration standard
--------------------------------------------------------------------------------

La configuration standard de Grunt et celle avec laquelle tous nos projets
doivent être initialisés. Cette configuration comprend un jeu de plugins
standards ainsi que certaines taches personnalisées identiques pour tous les
projets.


### Plugin standards
Par défaut, tout projet utilise les plugins suivant avec leur taches associé:

* [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
* [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)


### Taches normalisées
Tous nos projet doivent, de manière standard proposer les taches normalisées
suivantes:

#### build
Cette tache va intégrallement reconstruire le contenu du dossier `/build`.
Cela inclus, la documentation du projet au format HTML, la version static de
dévelopement du projet et la version static prète à être livré pour la
production.

```bash
$ grunt build
```

#### live
Cette tache est la tache à utiliser lors de l'intégration. Elle recontruit le
projet puis lance un server web statique sur la version de développement et
enfin observe tous les changements sur les fichiers sources. Les changements
seront automatiquement répercuté sur le build de dévelopement et le navigateur
mis à jour.

```bash
$ grunt live
```


Autres plugins
--------------------------------------------------------------------------------

En plus de la configuration standard, il est tout à fait possible d'utiliser
d'autre taches grunt. Selon le contexte projet tout est possible.

Nous recommandons cependant d'enregistrer ses taches dans la section
`devDependencies` du fichier `package.json`. Pour cela, il suffit d'utiliser le
flag `--save-dev` lors de l'installation de la tache:

```bash
$ npm install <nom de la tache> --save-dev
```