app.directive("angularMultiselect",
    function() {
        return {
            restrict: "E",
            scope: {
                array: '=',
                type: '=',
                ngmodel: '='
            },
            templateUrl: "templates/angualarMaterialmultiselect.html",
            link: function(scope, element, attrs) {
                scope.selectallMdl = false;
                scope.dynamicarray = [];
                scope.dynamicarray = scope.array !== undefined && scope.array !== "" && scope.array !== null && scope.array.length > 0 ? scope.array : [];
                scope.$watch('array', function() {
                    scope.dynamicarray = scope.array !== undefined && scope.array !== "" && scope.array !== null ? scope.array : [];
                });
                scope.$watch('ngmodel', function(current, old) {
                    if (scope.array !== undefined && scope.array !== "" && scope.array !== null && scope.array.length > 100 && scope.ngmodel !== undefined && scope.ngmodel !== "" && scope.ngmodel !== null && scope.ngmodel.length > 100) {
                        if (scope.ngmodel.length === scope.array.length) {
                            scope.ngmodel = null;
                        }
                    } else if (scope.ngmodel !== undefined && scope.ngmodel !== "" && scope.ngmodel !== null && scope.ngmodel.length > 0) {
                        scope.ngmodel = current.toString();
                    }
                });
                scope.directivechangeevent = function(ngmodel) {
                    scope.$emit('directivechangeevent', ngmodel, scope.type);
                };
            }
        };
    }
);