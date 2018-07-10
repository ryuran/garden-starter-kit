
Sass & Compass
===============================================================================

We use [Sass](http://sass-lang.com) and [Compass](http://compass-style.org) in old project.

Settings:
```json
{
  "css": {
    "engine": "compass",
  }
}
```

Check your environment
-------------------------------------------------------------------------------

Sass and compass are based on [Ruby](https://www.ruby-lang.org/), be sure it is installed in your environment.

You must install the ruby package manager [Bundler](http://bundler.io/) in your environment. (it allow to have several versions of Sass related to each projet).

With this command:

```bash
sudo gem install bundler
```

If `config.rb` and `Gemfile` do not exist at project root, you can copy them from `starter/` directory.

To be sure to have the last Sass and Compass version for the current project, run this command:

```bash
bundle install --path .gems
```

In case of issue of compilation Sass in an existing project, start always trying this command:

```bash
bundle update
```

Standard settings
-------------------------------------------------------------------------------

You can use Sass and Compass in the traditional way, all settings are in `config.rb`.
You can copy the exemple from `starter/` directory.

To build styles to build directory, run the command (recommanded):
```bash
gulp css
```

Or from traditional way directly with compass:
```bash
bundle exec compass compile
```

To build your styles with production settings (minification, etc.):

```bash
gulp css --optimize
```

Or from traditional way directly with compass:

```bash
bundle exec compass compile -e production
```

Advanced steeings
-------------------------------------------------------------------------------

### Install a module from NPM (recommanded)

Exemple with sass-mq:

Install the module `npm install sass-mq --save`

The import it in scss `@import 'sass-mq/mq';`.

### Install a module from bundler

Exemple with Sass-globing :

Add this line to `Gemfile` file `gem 'sass-globbing'`

Run the command `bundle install` to install it.

Then add `require 'sass-globbing'` in `config.rb` file.

If the gem expose some mixins you have to import it in scss. (Exemple with bourbon `@import 'bourbon';`).
