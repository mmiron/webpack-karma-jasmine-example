'use strict';

angular.module('cycleCountApp.countbin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/countbin', {
    templateUrl: '/maintenix/js/supplychain/cyclecount/countbin/countbin.html',
    controller: 'countBinController'
  });

  $routeProvider.when('/countbin/:binLocation', {
    templateUrl: '/maintenix/js/supplychain/cyclecount/countbin/countbin.html',
    controller: 'countBinController'
  });

}])

.controller('countBinController', ['$scope', '$location', function($scope, $location) {

    console.log("inside counts bin controller" );

	//var param = $routeParams.binLocation || "";

	$scope.binLocation =  'BOS/BIN1';

	$scope.pendingCounts = [ {
   	   "Bin" : "BOS/BIN1",
	   "PartNo": "853080-2121",
	   "CountBy": "19-FEB-2019",
	   "Qty": ""
   },
   {
   	   "Bin" : "BOS/BIN1",
	   "PartNo": "4534784-5463",
	   "CountBy": "19-FEB-2019",
	   "Qty": ""
   },
   {
   	   "Bin" : "BOS/BIN1",
	   "PartNo": "4534784-5463",
	   "CountBy": "19-FEB-2019",
	   "Qty": ""
   },
   {
   	   "Bin" : "BOS/BIN2",
	   "PartNo": "4534784-5463",
	   "CountBy": "28-FEB-2019",
	   "Qty": ""
   }
    ];

$scope.goToMain  = function() {

        console.log("inside goToMain ");
		$location.path('/main.html');
  };


}]);