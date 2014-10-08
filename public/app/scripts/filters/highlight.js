'use strict';

/**
 * @ngdoc filter
 * @name publicApp.filter:highlight
 * @function
 * @description
 * # highlight
 * Filter in the publicApp.
 */
angular.module('plLog')
  .filter('actionLog', function () {
    return function (input) {
    	if(input === null) {
    		return '';
    	};

    	var parts = input.match( /(.*?): / );

		// TODO check for this to see if array is empty 
    	if(parts != undefined) {
    		return parts[0];
    	}
    	else {
    		return '';
    	};
    };
  });

  angular.module('plLog')
  .filter('textLog', function () {
    return function (input) {
    	if(input === null) {
    		return '';
    	};

    	var parts = input.match( /: (.*)/ );

		// TODO check for this to see if array is empty 
    	if(parts != undefined) {
    		return parts[1];
    	};

		return input;
    };
  });
