/*
 * grunt-js-beautify
 * https://github.com/steve/grunt-js-beautify
 *
 * Copyright (c) 2015 Steven Edouard
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('js_beautify', 'Grunt plugin for running js-beautify', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            'indent-size': 4,
            'indent-char': " ",
            'indent-level': 0,
            'indexnt-with-tabs': false,
            'preserve-newlines': true,
            'max-preserve-newlines': 1,
            'space-in-paren': 0,
            'jslint-happy': false,
            'space-after-anon-function': true,
            'brace-style': 'collapse',
            'break-chained-methods': false,
            'keep-array-indentation': true,
            'unescape-strings': true,
            'wrap-line-length': true,
            'e4x': true,
            'end-with-newline': true,
            'comma-first': false,
            'good-stuff': false
        });

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            // Concat specified files.
            var src = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                // Read file source.
                var beautify = require('js-beautify').js_beautify;

                var beautified = beautify(grunt.file.read(filepath), options);
                grunt.file.write(filepath, beautified);
                grunt.log.writeln('sucessfully beautified ' + filepath);

            });
        });
    });
};