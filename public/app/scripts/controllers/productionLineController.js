var plLog = angular.module('plLog', ['angularFileUpload']);

plLog.controller('ProductionLineController', function($scope, $http, $upload) {
	$http.get('/log').
	success(function(data) {
		initialize(data);
	});

	$scope.initializeState = function(step) {
		var startDate = parseDate(step.start);
		var endDate = parseDate(step.end);
		step.runningTimeCent = percentage(Math.abs(endDate - startDate));
		step.offsetTimeCent = percentage(Math.abs($scope.data.start - startDate));
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
		$scope.runningTotal = (function xyz() {
			$scope.data.start = parseDate(data.start);
			$scope.data.end = parseDate(data.end);
			return Math.abs($scope.data.end - $scope.data.start);
		})();
		$scope.runningTotalCent = 100;
	}

	function percentage(value) {
		return ( value * 100) / $scope.runningTotal;
	};

	function parseDate(date) {
		var fields = date.split( /[\/(, ):]/g );
		return new Date(fields[2],fields[1]-1,fields[0],fields[4],fields[5],fields[6],fields[7])
	};
});