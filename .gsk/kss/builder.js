'use strict';

/**
 * This module is used to load the base KSS builder class needed by this builder
 * and to define any custom CLI options or extend any base class methods.
 *
 * Note: since this builder wants to extend the KssBuilderBase class, it
 * must export a KssBuilderBase sub-class as a module. Otherwise, kss-node
 * will assume the builder wants to use the KssBuilderBaseHandlebars class.
 *
 * This file's name should follow standard node.js require() conventions. It
 * should either be named index.js or have its name set in the "main" property
 * of the builder's package.json. See
 * http://nodejs.org/api/modules.html#modules_folders_as_modules
 *
 * @module kss/builder/twig
 */


// We want to extend kss-node's Twig builder so we can add options that
// are used in our templates.
let KssBuilderBase;

// gks config
var ENV = require('../tools/env');

try {
  // In order for a builder to be "kss clone"-able, it must use the
  // require('kss/builder/path') syntax.
  KssBuilderBase = require('kss/builder/base/' + ENV.html.engine);
} catch (e) {
  // The above require() line will always work.
  //
  // Unless you are one of the developers of kss-node and are using a git clone
  // of kss-node where this code will not be inside a "node_modules/kss" folder
  // which would allow node.js to find it with require('kss/anything'), forcing
  // you to write a long-winded comment and catch the error and try again using
  // a relative path.
  KssBuilderBase = require('../base/' + ENV.html.engine);
}

/**
 * A kss-node builder that takes input files and builds a style guide using Twig
 * templates.
 */
class KssBuilder extends KssBuilderBase {
  /**
   * Create a builder object.
   */
  constructor() {
    // First call the constructor of KssBuilderBase.
    super();


    // Then tell kss which Yargs-like options this builder adds.
    this.addOptionDefinitions({
      title: {
        group: 'Style guide:',
        string: true,
        multiple: false,
        describe: 'Title of the style guide',
        default: 'KSS Style Guide'
      }
    });
  }

  /**
   * Allow the builder to preform pre-build tasks or modify the KssStyleGuide
   * object.
   *
   * The method can be set by any KssBuilderBase sub-class to do any custom tasks
   * after the KssStyleGuide object is created and before the HTML style guide
   * is built.
   *
   * @param {KssStyleGuide} styleGuide The KSS style guide in object format.
   * @returns {Promise.<KssStyleGuide>} A `Promise` object resolving to
   *   `styleGuide`.
   */
  prepare(styleGuide) {
    // First we let KssBuilderBase.prepare() clean-up the style guide object.
    return super.prepare(styleGuide).then(styleGuide => {
      console.log(this);

      if (this.Handlebars){
        // Allow a builder user to override the {{section [reference]}} helper
        // with the --extend setting. Since a user's handlebars helpers are
        // loaded first, we need to check if this helper already exists.
        if (!this.Handlebars.helpers.section) {
          /**
           * Returns a single section, found by its reference
           * @param  {String} reference The reference to search for.
           */
          this.Handlebars.registerHelper('section', function(reference, options) {
            let section = options.data.root.styleGuide.sections(reference);

            return section.toJSON ? options.fn(section.toJSON()) : options.inverse('');
          });
        }

        // Allow a builder user to override the {{eachSection [query]}} helper
        // with the --extend setting.
        if (!this.Handlebars.helpers.eachSection) {
          /**
           * Loop over a section query. If a number is supplied, will convert into
           * a query for all children and descendants of that reference.
           * @param  {Mixed} query The section query
           */
          this.Handlebars.registerHelper('eachSection', function(query, options) {
            let styleGuide = options.data.root.styleGuide;

            if (!query.match(/\bx\b|\*/g)) {
              query = query + '.*';
            }
            let sections = styleGuide.sections(query);
            if (!sections.length) {
              return options.inverse('');
            }

            let l = sections.length;
            let buffer = '';
            for (let i = 0; i < l; i += 1) {
              buffer += options.fn(sections[i].toJSON());
            }

            return buffer;
          });
        }
      }

      return Promise.resolve(styleGuide);
    });
  }
}

module.exports = KssBuilder;
