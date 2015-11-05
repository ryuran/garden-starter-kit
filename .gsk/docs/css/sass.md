
Sass & Compass
===============================================================================

Pour tous nos projets, nous utilisons [Sass](http://sass-lang.com) et
régulièrement [Compass](http://compass-style.org)


Vérifier votre environnement
-------------------------------------------------------------------------------

Sass repose sur [Ruby](https://www.ruby-lang.org/fr/), assurez-vous que vous
l'avez bien installé sur votre environnement.

Il est également nécessaire d'installer l'utilitaire
[Bundler](http://bundler.io/) dans votre environnement global (cela permet d'avoir plusieurs versions de Sass en fonction de chaque projets).

Si ce n'est pas déjà le cas, exécutez simplement la commande suivante :

```bash
$ sudo gem install bundler
```

Puis, pour être sûr que vous disposer de la dernière version de Sass et Compass
pour le projet sur lequel vous travaillez, exécutez la commande suivante :

```bash
$ sudo bundle install
```

En cas de problème de compilation Sass sur un projet existant commencez toujours par exécuter la commande suivante:

```bash
$ sudo bundle update
```


Configuration standard
--------------------------------------------------------------------------------

Vous pouvez utiliser Sass/Compass de manière traditionnelle, toute la configuration de l'environnement est centralisé dans le ficher `config.rb`

Sachez que lancer la tache grunt `build` lancera automatiquement la
compilation Compass des deux environnements de `dev` et `prod`. Cependant, si
vous souhaitez utiliser Sass/Compass sans Grunt, c'est possible.

Pour compiler les styles du projet vers l'environnement de développement,
exécuter simplement la commande suivante :

```bash
$ bundle exec compass compile
```

ou bien via grunt :

```bash
$ grunt compass:dev
```

Pour compiler les styles du projet vers l'environnement de production il suffit
de rajouter le paramètre `-e prodution` :

```bash
$ bundle exec compass compile -e production
```

ou bien via grunt :

```bash
$ grunt compass:prod
```


### Grunt & Watch

Lors de la phase de développement, vous pouvez utiliser indifférement le watcher de Grunt ou de Compass pour compiler vos feuilles de style.

Pour lancer le watcher de Compass, exécutez simplement :

```bash
$ bundle exec compass watch
```

Si vous souhaitez utiliser le watcher de Grunt en même temps c'est possible.
Dans ce cas, il faut lui dire explicitement de ne pas utiliser Sass/Compass.
Pour cela, dans une autre fenêtre de votre terminal, lancez le watcher de Grunt
avec la commande suivante :

```bash
$ grunt watch --sass=no
```
