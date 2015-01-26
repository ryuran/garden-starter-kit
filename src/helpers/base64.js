var grunt = require('grunt');

module.exports.register = function(Handlebars) {
	'use strict';
    Handlebars.registerHelper('base64', function(file) {
        var content = grunt.file.read(file, {encoding: null});
        var output = content.toString('base64');
        return new Handlebars.SafeString(output);
    });
};
