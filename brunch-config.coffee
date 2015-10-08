exports.config =
  npm:
    enabled: true

  paths:
    public : 'build'
    watched: ['src', 'test', 'vendor']

  files:
    javascripts:
      joinTo:
        'js/app.js'   : ['src/js/**/*.js']
        'js/vendor.js': ['{node_modules,vendor}/**/*.js']

    #Comment this configuration  if you want to use Compass standalone
    stylesheets:
      joinTo: 'css/styles.css'

    #Comment this configuration if you don't want to get compiled twig files
    templates:
      joinTo: 'js/tpl.js'

  plugins:
    # Use of Sass through Ruby rather than libsass
    # Unfortunatly, Compass is not supported by brunch
    # If you want to use Compass, use it standalone and
    # comment this Sass configuration
    sass:
      mode: 'ruby'
      allowCache: true
      useBundler: true
      options: ['--precision', 8]

    postcss:
      processors: [
        require('autoprefixer')(['> 4%', 'ie >= 8'])
      ]

    twig:
      extension: 'twig'
      static:
        directory: 'src/assets'
        data: 'src/twig.json'
