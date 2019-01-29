// Karma configuration
// const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use; available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    plugins: ['@metahub/karma-jasmine-jquery', 'karma-*'],
    frameworks: ['jasmine', 'jasmine-jquery'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/phantomjs-polyfill-string-includes/index.js',
      'node_modules/jquery-typeahead/src/jquery.typeahead.js',

      'node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'node_modules/jasmine-ajax/lib/mock-ajax.js',
      'node_modules/jasmine-promises/dist/jasmine-promises.js',
      'node_modules/es6-promise/dist/es6-promise.min.js',
      'node_modules/es6-promise/dist/es6-promise.auto.min.js',
	  
	  'node_modules/tabulator-tables/dist/js/tabulator.min.js',

      'src/test/javascript/spec-bundle.js',
      'src/test/javascript/*.spec-bundle.js'

    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    // port: 9876,
    hostname: process.env.IP,
    port: process.env.PORT,
    runnerPort: 0,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    client: {
      config: {
        browserConsoleLogOptions: true
      }
    },

    // webpack inclusion
    webpack: webpackConfig

  });
};
