app.directive("angularMultiselect", ["$injector", 'authSvc',
    '$timeout',
    function($injector, authSvc, timeout) {

        return {
            restrict: "E",
            scope: {
                array: '=',
                type: '=',
                modelpopup: '='
            },
            templateUrl: "templates/angualarMaterialmultiselect.html",
            link: function(scope, element, attrs) {
                scope.Castemulti = scope.array !== undefined && scope.array !== "" && scope.array !== null && scope.array.length > 0 ? scope.array : [];
                scope.$watch('array', function() {
                    scope.Castemulti = scope.array !== undefined && scope.array !== "" && scope.array !== null ? scope.array : [];
                });
                scope.$watch('modelpopup', function(current, old) {
                    if (scope.array !== undefined && scope.array !== "" && scope.array !== null && scope.array.length > 100 && scope.modelpopup !== undefined && scope.modelpopup !== "" && scope.modelpopup !== null && scope.modelpopup.length > 100) {
                        if (scope.modelpopup.length === scope.array.length) {
                            scope.modelpopup = null;
                        }
                    } else if (scope.modelpopup !== undefined && scope.modelpopup !== "" && scope.modelpopup !== null && scope.modelpopup.length > 0) {
                        scope.modelpopup = current;
                    }
                });
                scope.directivechangeevent = function(modelpopup) {
                    scope.$emit('directivechangeevent', modelpopup, scope.type);
                };

            }
        };
    }
]);