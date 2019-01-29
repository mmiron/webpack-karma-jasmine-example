'use strict';
/* global angular */

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngFileUpload',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'myApp'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.when('/upload', {
    templateUrl: 'fileUpload/fileUpload.html',
    controller: 'FileUploadCtrl'
  });

  $routeProvider.otherwise({ redirectTo: '/upload' });
}]);
