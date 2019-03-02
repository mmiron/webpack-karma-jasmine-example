angular.module('cycleCountApp', [
  'ngRoute',
  'ngAnimate',
  'cycleCountApp.main',
  'cycleCountApp.countbin'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  //$locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/main'});
}]);