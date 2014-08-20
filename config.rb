# Require any additional compass plugins here.
require 'animate-sass'
require 'bootstrap-sass'
require 'breakpoint'
require 'compass-recipes'
require 'compass-normalize'
require 'susy'
require 'rgba_png'

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "dist/css"
sass_dir = "src/scss"
images_dir = "src/static/img"
generated_images_dir = "dist/img"
fonts_dir = "src/static/fonts"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
# output_style = :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
preferred_syntax = :scss
# and then run:
# sass-convert -R --from scss --to sass scss scss && rm -rf sass && mv scss sass
