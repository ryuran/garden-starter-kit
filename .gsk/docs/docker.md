
Docker : Image docker du Garden Starter Kit
===============================================================================

Installation de Docker :
-------------------------------------------------------------------------------

Merci de suivre les instructions sur [le site officiel](https://www.docker.com/products/docker).

Création de l’image en locale
-------------------------------------------------------------------------------

> **NOTE :**  _l’image étant disponible sur le Docker hub, cette étape n’est pas necéssaire à part si vous voulez votre propre image lié à votre projet._

```bash
docker build -t cleverage/garden-starter-kit .
```


Simplement avoir un aperçu de G.S.K. :
-------------------------------------------------------------------------------

Vous pouvez avoir un aperçu de G.S.K. avec la commande suivante :

```bash
$ docker run -it --rm -p 8000:8000 cleverage/garden-starter-kit bash -c "npm install && npm start"
```

Il vous suffit ensuite de vous rendre sur http://localhost:8000

Utilisation sur votre projet :
-------------------------------------------------------------------------------

Récupérer le G.S.K. :

```bash
$ cd ~/monProjet
$ git clone git@github.com:cleverage/garden-starter-kit.git .
$ rm -rf .git
```

### Methode 1 : Avec un conteneur actif en permanence (recommandé) :

Créer et démarrer un nouveau conteneur :

```bash
$ docker run -d --name myProject -v "$PWD":/usr/src/app -p 8000:8000 -p 3001:3001 cleverage/garden-starter-kit tail -f /dev/null
```

Ou alors pour travailler ensuite directement dans le container :

```bash
$ docker run -it --name myProject -v "$PWD":/usr/src/app -p 8000:8000 -p 3001:3001 cleverage/garden-starter-kit bash
```

Vous pouvez ensuite lancer vos commandes avec `docker exec -it myProject [my command]`, par exemple :

```bash
$ docker exec -it myProject npm install
$ docker exec -it myProject bundle install
$ docker exec -it myProject gulp live
$ docker exec -it myProject bash
```

Pour arreter et redémarrer le conteneur :

```bash
docker stop myProject
docker start myProject
```

Pour supprimer le conteneur :

```bash
docker rm myProject
```

### Methode 2 : Sans conteneur actif en permanence :

Pour lancer vos commandes :

```bash
$ docker run -it --rm -v "$PWD":/usr/src/app [-p 8000:8000 -p 3001:3001] cleverage/garden-starter-kit [my command]
```

Par exemple :

```bash
$ docker run -it --rm -v "$PWD":/usr/src/app cleverage/garden-starter-kit npm install
$ docker run -it --rm -v "$PWD":/usr/src/app -p 8000:8000 -p 3001:3001 cleverage/garden-starter-kit gulp live
```
