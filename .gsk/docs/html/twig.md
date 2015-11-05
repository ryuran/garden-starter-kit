
TWIG
===============================================================================

Dans la mesure ou de nombreux projet chez Clever Age utilise Symfony, [Twig](http://twig.sensiolabs.org/) est aussi le système de templating par defaut que l'on utilise pour créer nos
pages HTML statique (via `twig.js`).

Configuration:
```json
{
  "html": {
    "engine": "twig",
  }
}
```


Configuration standard
-------------------------------------------------------------------------------

Twig ne requier aucune configuration particulière. Cependant, il faut noté que,
par defaut, toutes les variables qui seront utiliser pour peupler les fichiers
lors de la compilation sont dans le dossier `src/data`

Les données sont sous la forme de fichier JSON avec un fichier générique
(`src/data/data.json`), plus un fichier spécifique qui doit porté le même nom
que le template twig correspondant (`src/data/monFichierTwig.json`). Les deux
sont amalgamé pour être utilisé var le template twig. Si les deux fichiers
propose les même variable, celles du fichier spécifique écrase celles du
fichier générique.
