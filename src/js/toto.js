/** toto */

// import from a lib
var lib = require('./lib/lib');

// or from another module
// var toto2 = require('./toto2')

// or directly import from node_modules
// var _ = require('underscore');

// some behaviour for our module
function foo(firstname) {
  window.console.log('Hello %s!', firstname);
}

foo(lib.firstname);

// expose foo to other modules
module.exports.foo = foo;
