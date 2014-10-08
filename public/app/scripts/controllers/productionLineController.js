var plLog = angular.module('plLog', []);

plLog.controller('ProductionLineController', function($scope, $http) {
	/* $scope.greeting = 'Hola!'; */
	$http.get('/log').
	success(function(data) {
		$scope.data = data;
	});

	$scope.someFunction = function(index) {
		var date = $scope.data.steps[index].start.split( /[\/(, ):]/g );
		var startDate = new Date(date[2],date[1]-1,date[0],date[4],date[5],date[6],date[7]);
		date = $scope.data.steps[index].end.split( /[\/(, ):]/g );
		var endDate = new Date(date[2],date[1]-1,date[0],date[4],date[5],date[6],date[7]);
		$scope.data.steps[index].runningTime = Math.abs(endDate - startDate);
	};
});
/*
function ProductionLineController($scope, $http) {
	$http.get('/log').
        success(function(data) {
            $scope.data = data;
        });
}*/