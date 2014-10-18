var plLog = angular.module('plLog', ['angularFileUpload']);

plLog.controller('ProductionLineController', function($scope, $http, $upload) {
	// $http.get('/log').
	// success(function(data) {
	// 	initialize(data);
	// });

	$scope.initializeState = function(step) {
		step.lenghtCent = percentage(step.lenght);
		step.offsetCent = percentage(step.offset);
	};

	$scope.onFileSelect = function($files) {
		$upload.upload({
			url: '/log/upload',
			method: 'POST',
			file: $files[0]
		}).success(function(response, status, headers, config) {
			$scope.data = [];
			initialize(response);
		}).error(function(response, status, headers, config) {
			console.log('error!!!!');
		});
	};
	
	$scope.cleanScreen = function() {
		$scope.data = [];
	}

	function initialize(data)
	{
		$scope.data = data;
		$scope.runningTotal = 0;
		(function xyz() {
			$scope.data.start = parseDate(data.start);
			iterate($scope.data.steps);
			iterate($scope.data.rollbackSteps);
		})();
		console.log($scope.runningTotal);
		$scope.runningTotalCent = 100;
	}

	function iterate(steps) {
		for (var i = 0; i < steps.length; i++) {
			var carry = $scope.runningTotal;
			$scope.runningTotal += addTimes(steps[i], carry);
		};
	};

	function addTimes(step) {
		startDate = parseDate(step.start);
		endDate = parseDate(step.end);
		step.lenght = endDate - startDate;
		step.offset = $scope.runningTotal;

		console.log("step start: " + step.offset + " lenght " + step.lenght);
		return step.lenght;
	}

	function percentage(value) {
		return ( value * 100) / $scope.runningTotal;
	};

	function parseDate(date) {
		var fields = date.split( /[\/(, ):]/g );
		return new Date(fields[2],fields[1]-1,fields[0],fields[4],fields[5],fields[6],fields[7])
	};
});