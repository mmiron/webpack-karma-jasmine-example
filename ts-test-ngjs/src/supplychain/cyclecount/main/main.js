import angular from 'angular';

import lmocHeaderComponent   from './components/lmoc-header/lmoc-header.component.js';

angular.module('cycleCountApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {

 var randomNum = Date.now();
  $routeProvider.when('/main', {
    templateUrl: '/maintenix/js/supplychain/cyclecount/main/main.html?v=' + randomNum,
    controller: 'MainCtrl'
  });
}])
.component('lmocHeader', lmocHeaderComponent)
.service('cycleCountService', function($http) {

   this.$http = $http;

    this.getPendingCycleCounts = function() {
       let self = this;
      return self.$http.get("/maintenix/rest/cyclecount");
    }

})
.controller('MainCtrl', ['$scope', '$filter', '$location', 'cycleCountService', function($scope, $filter, $location, cycleCountService ) {

   $scope.currentDate = new Date();
   $scope.binLocation = '';
   $scope.daysCount = null;

   cycleCountService.getPendingCycleCounts().then((response) => { $scope.pendingCounts = response.data; });

   console.log("inside MainCtrl, pendingCycleCounts = " + JSON.stringify($scope.pendingCounts));

   $scope.goToCountBin  = function() {

      console.log("inside goToCountBin = " + $scope.binLocation);
      $location.path('/countbin').search({binLocation: $scope.binLocation});
   };


   $scope.reset = function() {
      $scope.binLocation = '';
      $scope.daysCount = null;
   };

   $scope.enterQty = function() {
      $('#exampleModal').modal('show')
   };



}]);