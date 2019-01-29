const webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({

    basePath: './',

    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/ng-file-upload/dist/ng-file-upload-shim.min.js',
      'app/bower_components/ng-file-upload/dist/ng-file-upload.js',

      'app/**/*.js',
      'app/**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    preprocessors: {
      '**/*.js': ['babel'],
      '**/*.spec.js': ['babel']
    },

    plugins: [
      // 'karma-chrome-launcher',
      // 'karma-jasmine',
      // // 'karma-phantomjs-launcher',
      // 'karma-commonjs',
      // 'karma-babel-preprocessor',
      // 'karma-jasmine',
      // // 'karma-mocha',
      // 'karma-webpack',
      // 'karma-coverage',
      // 'karma-chrome-launcher',
      // 'karma-phantomjs-launcher'

      'karma-junit-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-babel-preprocessor'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    // webpack inclusion
    webpack: webpackConfig

  });
};
