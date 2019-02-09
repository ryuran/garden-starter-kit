#!/usr/bin/env node
const argv = require('yargs').argv;
const inquirer = require('inquirer');

const gskInit = require('./lib/init');

// process.env.PWD : …/trygsknext
// process.cwd() : …/trygsknext
// __dirname : …/trygsknext/node_modules/garden-starterkit

// check if project is instaled yet
console.log('This project seems to be already initializated');

// else welcome
console.log('Welcome in Garden-starterkit.');

const config = require('./config.json');

if (argv.default) {
  // use default config
  gskInit(config);
} else {
  // start prompt to config gsk
  inquirer.prompt([
    // {
    //   type: 'list',
    //   message: 'Select your HTML engine:',
    //   name: 'html',
    //   choices: [
    //     {
    //       name: 'Twig',
    //       checked: true,
    //       value: 'twig'
    //     }
    //   ]
    // },
    // {
    //   type: 'list',
    //   message: 'Select your CSS engine:',
    //   name: 'css',
    //   choices: [
    //     {
    //       name: 'Sass (node-sass)',
    //       checked: true,
    //       value: 'sass'
    //     },
    //     {
    //       name: 'Compass (with ruby)',
    //       value: 'compass'
    //     },
    //     {
    //       name: 'Stylus',
    //       value: 'stylus'
    //     }
    //   ]
    // }
  ]).then(function (answers) {
    // config.html.engine = answers.html;
    // config.css.engine = answers.css;

    gskInit(config);
  });
}
