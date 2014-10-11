var plLog = angular.module('plLog', []);

plLog.controller('ProductionLineController', function($scope, $http) {
	/* $scope.greeting = 'Hola!'; */
	$http.get('/log').
	success(function(data) {
		$scope.data = data;
		$scope.runningTotal = (function xyz() {
			$scope.data.start = parseDate(data.start);
			$scope.data.end = parseDate(data.end);
			return Math.abs($scope.data.end - $scope.data.start);


			})();
		// $scope.data.endCent = percentage($scope.data.end);
		// $scope.data.startCent = percentage($scope.data.start);
		$scope.runningTotalCent = 100;
		});

	$scope.initializeState = function(step) {
		var startDate = parseDate(step.start);
		var endDate = parseDate(step.end);
		step.runningTimeCent = percentage(Math.abs(endDate - startDate));
		step.offsetTimeCent = percentage(Math.abs($scope.data.start - startDate));
	};

	function percentage(value) {
		return ( value * 100) / $scope.runningTotal;
	};

	function parseDate(date) {
		var fields = date.split( /[\/(, ):]/g );
		return new Date(fields[2],fields[1]-1,fields[0],fields[4],fields[5],fields[6],fields[7])
	};
});
/*
function ProductionLineController($scope, $http) {
	$http.get('/log').
        success(function(data) {
            $scope.data = data;
        });
}*/