app.directive("bootstrapTablenew", ['commonpage', '$timeout',
    function(commonpage, timeout) {
        return {
            restrict: "E",
            scope: {
                model: '='
            },
            templateUrl: "templates/directive.html",
            link: function(scope, element, attrs) {
                scope.init = function() {
                    scope.model.data = [];
                    scope.model.exportColumns = {};
                    _.each(scope.model.columns, function(item) {
                        if (item.text !== '')
                            scope.model.exportColumns[item.key] = item.text;
                    });
                    scope.detailView = false
                };
                scope.$watch(scope.model, function() {
                    scope.init();
                });
                scope.plus = function(data) {
                    alert(JSON.stringify(data));
                };
                scope.init();
            }
        };
    }
]);