app.directive("angularMultiselect", ["$injector", 'authSvc',
    '$timeout',
    function($injector, authSvc, timeout) {

        return {
            restrict: "E",
            scope: {
                array: '=',
                type: '=',
                model: '=',
                castehideval: '@',
                id: '='
            },
            templateUrl: "templates/angualarMaterialmultiselect.html",
            link: function(scope, element, attrs) {
                scope.selectallMdl = false;
                scope.IDs = scope.id;
                scope.Caste = scope.array !== undefined && scope.array !== "" && scope.array !== null && scope.array.length > 0 ? scope.array : [];
                scope.Castehide = scope.array !== undefined && scope.array !== "" && scope.array !== null ? false : true;
                scope.Castehide = scope.castehideval === 'castehid' ? true : false;
                scope.$watch('array', function() {
                    scope.Caste = scope.array !== undefined && scope.array !== "" && scope.array !== null ? scope.array : [];
                });
                scope.$watch('model', function(current, old) {
                    if (scope.array !== undefined && scope.array !== "" && scope.array !== null && scope.array.length > 100 && scope.model !== undefined && scope.model !== "" && scope.model !== null && scope.model.length > 100) {
                        if (scope.model.length === scope.array.length) {
                            scope.model = null;
                        }
                    } else if (scope.model !== undefined && scope.model !== "" && scope.model !== null && scope.model.length > 0) {
                        scope.model = current;
                    }
                });
                scope.directivechangeevent = function(model) {
                    scope.$emit('directivechangeevent', model, scope.type);
                };
                scope.applycolorsdirecive = function(value, id) {
                    var colors = "selectborderclass";
                    if (value !== 0 && value !== "0" && value !== "" && value !== null && value !== undefined && value.length > 0) {
                        if (value.toString() !== "0") {
                            colors = "selectborderclasscolor";
                            $('#' + id).next().find('button').addClass("bacg");
                        }
                    } else {
                        colors = "selectborderclass";
                        $('#' + id).next().find('button').removeClass("bacg");
                    }
                    return colors;
                };
            }
        };
    }
]);