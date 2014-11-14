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
  grunt.registerTask 'build', ['clean', 'compass']


  # CHARGE AUTOMATIQUEMENT TOUTES LES TACHES GRUNT DU PROJET
  # /!\ Attention, cela ne fonctionne que pour les taches préfixées `grunt-*`
  # ============================================================================
  require('load-grunt-tasks')(grunt)


  # CONFIGURATION DES TACHES CHARGÉES
  # ============================================================================
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

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
        tasks: ['sass']


  # TACHES UTILITAIRES
  # ============================================================================
  grunt.registerTask 'sass', 'Checking Sass requirement', () ->
    if grunt.option('sass') isnt 'no'
      grunt.log.write 'We are allowed to compile Sass'
      grunt.task.run 'compass:dev'
    else
      grunt.log.write 'We must not compile Sass'
