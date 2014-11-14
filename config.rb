# Nombre de décimal après la virgule, utile pour la précision des em
Sass::Script::Number.precision = 8

# Configuration des chemins des ressources:
sass_dir        = 'src/sass'
images_dir      = 'src/img'
javascripts_dir = 'src/js'
fonts_dir       = 'src/fonts'

# Configuration des chemins HTTP
http_path             = '/'
http_stylesheets_path = '/css'
http_images_path      = '/img'
http_javascripts_path = '/js'
http_fonts_path       = '/fonts'

# Configuration spécifique à chaque environement
if  environment == :production
    # chemin des ressources
    css_dir = 'build/prod/css'
    # options de sortie
    output_style = :compressed
else
    # chemin des ressources
    css_dir = 'build/dev/css'
    # options de sortie
    output_style =   :expanded
end


# Supprimer le hash générer par compass sur le nom des sprites
on_sprite_saved do |filename|
    if File.exists?(filename)
        FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
    end
end

# Remplacer les reférence au sprite avec hash dans la CSS par ceux sans hash
on_stylesheet_saved do |filename|
    if File.exists?(filename)
        css = File.read filename
        File.open(filename, 'w+') do |f|
            f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
        end
    end
end
