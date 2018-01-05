'use strict';

const webpack = require('webpack');
const path = require('path');
var glob = require('glob');

module.exports = function (ENV) {

  const SRC  = ENV.js['src-dir'];
  const DEST = ENV.js['dest-dir'];

  // Plugins
  const webpackPlugins = [];

  // If an external module try to use jQuery or $ as a global,
  // it make a require('jquery') to relolve it
  //
  webpackPlugins.push(
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    })
  );

  // Create a js file with modules common to each entries
  //
  // webpackPlugins.push(
  //   new webpack.optimize.CommonsChunkPlugin('common.js')
  // );

  // Minimise with uglify if --optimize used
  if (ENV.all.optimize) {
    webpackPlugins.push(new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
    }));
  }

  // Get collection of entries files from config.js
  const entries = {};

  const files = glob.sync(path.join(SRC, '*.js'));

  for (const file of files) {
    entries[path.basename(file, '.js')] = path.resolve(__dirname, file);
  }

  return {
    entry: entries,
    output: {
      path: path.join(process.cwd(), DEST),
      filename: '[name].js',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /(\.jsx|\.js)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              'presets': [
                '@babel/preset-env',
              ],
            },
          },
        },
        {
          test: require.resolve('jquery'),
          use: [
            {
              loader: 'expose-loader',
              options: 'jQuery',
            },
            {
              loader: 'expose-loader',
              options: '$',
            },
          ],
        },
      ],
    },
    resolve: {
      modules: [
        path.resolve('../src/js'),
        'node_modules',
      ],
      extensions: [
        '.js',
      ],
    },
    devtool: 'source-map',
    plugins: webpackPlugins,
  };
};
