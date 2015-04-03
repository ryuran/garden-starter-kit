
Bower
===============================================================================

[Bower](http://bower.io) est un gestionnaire de bibliothèques tierces
communément utilisé. Le starter kit peut être utilisé avec Bower pour gérer les
dépendances des bibliothèques JavaScript ou Sass.


Vérifier votre environnement
-------------------------------------------------------------------------------

Bower repose sur [NodeJS](http://nodejs.org/), assurez-vous que vous l'avez
bien installé sur votre environnement.

Bower lui même doit être installé au niveau de votre environnement global
(cela vous permet d'accéder à la commande `bower` dans votre terminal).

Si ce n'est pas déjà le cas, exécutez simplement la commande suivante :

```bash
$ sudo npm install -g bower
```


Installation des bibliothèques
-------------------------------------------------------------------------------

L'installation des bibliothèques d'un projet se fait simplement avec la
commande :

```bash
$ grunt bower
```

Ou bien, si vous preferez utiliser la commande `bower`:

```
$ bower install & grunt copy:bower
```

> **NOTE:** _La tâche `copy:bower` de grunt copie les fichiers rapatriés par
  bower dans les répertoires utilisés par grunt : Les fichiers JavaScript sont
  copiés dans `src/js/lib` et les fichiers Sass sont copiés dans `src/sass/lib`_

Il est possible de rajouter de nouvelles bibliothèques en utilisant la
commande :

```bash
$ bower install <bibliotheque> --save
```

L'option `--save` enregistrera la bibliothèque dans le fichier bower.json pour
que les autres intervenant du projets puissent synchroniser leur installation
par la suite.

> **NOTE:** _A chaque fois qu'un build est lancé via grunt, il commencera par
  exécuter la tache `bower` vu ci-avant._

Si vous souhaitez lancer votre build sans que bower soit appeler, c'est possible.
Dans ce cas, il faut lui dire explicitement de ne pas utiliser Bower. Pour cela,
il suffit d’appeler une des commandes suivantes (selon votre besoin) :

```bash
# Construction statique
$ grunt build --bower=no

# Construction avant un live
$ grunt live --bower=no
```

Configuration standard
-------------------------------------------------------------------------------

Le starter kit dispose déjà d'un fichier `bower.json` qui répertorie les
bibliothèques les plus communément utilisées sur nos projets:

* [jQuery](http://jquery.com)
* [MomentJS](http://momentjs.com)
* [Underscore](http://underscorejs.org/)

Il liste également certains outils de développements que nous utilisons
habituellement :

* [#grid](http://hashgrid.com)

Selon votre projet, n'hésitez pas à éditer le fichier `bower.json` pour
retirer les bibliothèques inutiles ou pour ajuster leur version. Si
vous laissez des bibliothèques inutiles, ce n'est pas très grave car seules
celles effectivement utilisées dans les gabarits HTML seront inclues dans les
builds de production.

> **NOTES:** _Les bibliothèques étant installées dans `src/js/lib` et
  `src/sass/lib`, ce répertoire est ignoré via le fichier `.gitignore`. Pensez
  à commenter la ligne correspondante dans ce fichier si vous ne souhaitez pas
  utiliser bower._
