(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .directive('focusMe', directive);

    directive.$inject = ['$window', '$timeout', '$parse'];

    function directive($window, $timeout, $parse) {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function(value) {
                if (value === true) {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
            // on blur event:
            element.bind('blur', function() {
                scope.$apply(model.assign(scope, false));
            });
        }
    }

})();