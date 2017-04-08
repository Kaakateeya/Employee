angular.module('Kaakateeya').directive("complexPopup", ['$timeout',
    function(timeout) {
        return {
            restrict: "E",
            scope: {
                model: '='
            },
            templateUrl: "directives/complex-popup/index.html",
            link: function(scope, element, attrs) {
                scope.$watch('scope.model', function() {
                    if (scope.model.showPopup) {
                        $('#' + scope.model.name).modal('show');
                    }
                });
            }
        };
    }
]);