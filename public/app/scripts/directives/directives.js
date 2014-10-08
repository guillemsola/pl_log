'use strict';

/**
 * @ngdoc directive
 * @name publicApp.directive:directives
 * @description
 * # directives
 */
angular.module('plLog')
  .directive('testDirective', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the directives directive');
      }
    };
  });

angular.module('plLog')
	.directive("inYellow", function() {
    return function(scope, element, attrs) {
        element.bind("mouseenter", function() {
            element.addClass("highlight");
        });            
        element.bind("mouseleave", function() {
            element.removeClass("highlight");
        });            
    };
});
