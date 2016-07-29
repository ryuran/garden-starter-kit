
JS: Concat Pipeline
===============================================================================

Il s'agit là d'une façon simple de gérer les scripts JS du projet. Avec
cette tache de base, les fichiers JS seront automatiquement concaténés et
minifié mais rien de plus.

Configuration:
```json
{
  "js": {
    "engine": "concat"
  }
}
```

> **NOTE:** _Par défaut, la concaténation des fichiers est faites dans l'ordre
  alphabétique des nom de fichiers puis de dossiers._


Configuration standard
-------------------------------------------------------------------------------

### Nom du fichier généré

Vous pouvez changer le nom du fichier généré via l'option `js.filename`, dans
le fichier configuration:

```json
{
  "js": {
    "filename": "script.js"
  }
}
```

### Bibliothèques tiers

Si vous utilisez des bibliothèques tiers (comme jQuery), il est vivement
recommandé les placer dans le dossier `src/js/lib`. Tous les fichiers placés
dans ce dossier seront concaténé **avant** tous les autres.

### Configuration avancée

Vous pouvez définir une configuration plus fine via l'option `js.filename`, qui
se composera d'un tableau d'objets comprenant les clés `src` et `dest` :

 * `src` est la liste ordonnée des fichiers à concaténer
 * `dest` est le fichier de destination pour la liste précédente

```json
{
  "js" : {
    "src-dir"  : "./src/js",
    "dest-dir" : "./build/js",
    "engine"   : "concat",
    "files"    : [{
        "src"  : "toto.js",
        "dest" : "toto.js"
      },{
        "src" : [
          "lib/jquery.js",
          "lib/**/*",
          "module-avant-1.js",
          "module-1.js"
        ],
        "dest" : "tutu.js"
      }]
  }
}
```

