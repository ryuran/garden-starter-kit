module.exports = (grunt) ->

  # TACHES PERSONNALISÉES COMMUNES A TOUS LES PROJETS
  # ============================================================================
  # $ grunt live
  # Lance tous les watcher grunt ainsi qu'un serveur statique pour voir le
  # contenu du repertoir `/build/dev`. Ce serveur utilise livereload pour
  # rafraichir automatiquement le navigateur dès qu'un  fichier est mis à jour.
  grunt.registerTask 'live',  ['build', 'connect:live', 'watch']

  # $ grunt build
  # Régénère le contenu du dossier `/build`. Il est recommandé de lancer cette
  # tache à chaque fois que l'on réalise un `git pull` du projet.
  grunt.registerTask 'build', ['clean', 'compass', 'imagemin']


  # CHARGE AUTOMATIQUEMENT TOUTES LES TACHES GRUNT DU PROJET
  # /!\ Attention, cela ne fonctionne que pour les taches préfixées `grunt-*`
  # ============================================================================
  require('load-grunt-tasks')(grunt)


  # CONFIGURATION DES TACHES CHARGÉES
  # ============================================================================
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    # $ grunt imagemin
    # --------------------------------------------------------------------------
    # Optimise automatiquement les images (png, jpeg, gif et svg)
    # Seul les images à la racine de `src/img` sont optimisées. Les images
    # optimisées sont automatiquement placées dans `build/dev` et `build/prod`
    imagemin:
      options:
        progressive: false
        svgoPlugins: [
          removeHiddenElems  : false
          convertStyleToAttrs: false
        ]
      dev:
        files: [
          expand: true,
          cwd   : 'src/img/',
          src   : ['*.{png,jpg,gif,svg}'],
          dest  : 'build/dev/img/'
        ]
      prod:
        files: [
          expand: true,
          cwd   : 'src/img/',
          src   : ['*.{png,jpg,gif,svg}'],
          dest  : 'build/prod/img/'
        ]

    # $ grunt compass
    # --------------------------------------------------------------------------
    # Gère la compilation compass
    # TODO: configurer l'option watch pour rendre la compilation plus rapide
    compass:
      options:
        bundleExec: true
        config: 'config.rb'
      dev:
        options:
          environment: 'development'
      prod:
        options:
          environment: 'production'

    # $ grunt clean
    # --------------------------------------------------------------------------
    # Supprime tous les fichiers avant de lancer un build
    clean:
      dev : ['/build/dev']
      prod: ['/build/prod']
      doc : ['/build/doc']

    # $ grunt connect
    # --------------------------------------------------------------------------
    # Static web server près à l'emplois pour afficher du HTML statique.
    connect:
      options:
        hostname: 'localhost'

      # $ grunt connect:live
      # Uniquement pour être utilisé avec watch:livereload
      live:
        options:
          base       : 'build/dev'
          port       : 8000
          livereload : true

      # $ grunt connect:dev
      # Pour pouvoir voir le contenu du repertoir `/build/dev` et `/build/docs`
      # A l'adresse http://localhost:8000 et http://localhost:8000/docs/
      dev:
        options :
          port       : 8000
          keepalive  : true
          middleware : (connect) ->
            [ connect.static('build/dev'),
              connect().use('/docs', connect.static('build/docs')) ]

      # $ grunt connect:prod
      # Pour pouvoir voir le contenu du repertoir `/build/prod`
      # A l'adresse http://localhost:8001
      prod:
        options :
          base       : 'build/prod'
          port       : 8001
          keepalive  : true

    # $ grunt jshint
    # --------------------------------------------------------------------------
    # Vérifie que les fichiers Javascript suivent les conventions de codage
    jshint:
      all: ['src/**/*.js']
      options:
        jshintrc: '.jshintrc'

    # $ grunt scsslint
    # --------------------------------------------------------------------------
    # Vérifie que les fichiers Sass suivent les conventions de codage
    scsslint:
      all: ['src/**/*.scss']
      options:
        bundleExec: true
        config: '.scss-lint.yml'

    # $ grunt watch
    # --------------------------------------------------------------------------
    # Configuration de tous les watcher du projet
    watch:
      livereload:
        options:
          livereload: true
        files: ['build/dev/**/*']
      sass:
        files: 'src/sass/**/*.scss'
        tasks: ['newer:scsslint', 'sass']
      images:
        files: 'src/img/*.{png,jpg,gif,svg}'
        tasks: ['newer:imagemin:dev']
      js:
        files: 'src/js/**/*.js'
        tasks: ['newer:jshint']


  # TACHES UTILITAIRES
  # ============================================================================
  # Intermediate task to handle `$ grunt watch --sass=no`
  grunt.registerTask 'sass', 'Checking Sass requirement', () ->
    if grunt.option('sass') isnt 'no'
      grunt.log.write 'We are allowed to compile Sass'
      grunt.task.run 'compass:dev'
    else
      grunt.log.write 'We must not compile Sass'
