angular.module('Kaakateeya').directive("singleGrid", ['modelpopupopenmethod', '$timeout', 'SelectBindServiceApp', 'authSvc', 'alert',
    function(commonpage, timeout, SelectBindServiceApp, authSvc, alertss) {
        return {
            restrict: "E",
            scope: {
                model: '=',
                config: '='
            },
            templateUrl: "directives/singel-grid/index.html",
            link: function(scope, element, attrs) {

                scope.init = function() {
                    // scope.model.sdata = [];
                    scope.currentPage = 0;
                    scope.pageSize = 10;
                    scope.model.exportColumns = {};
                    _.each(scope.model.columns, function(item) {
                        if (item.text !== '')
                            scope.model.exportColumns[item.key] = item.text;
                    });
                    scope.detailView = false;
                };
                scope.page = {};
                scope.page.model = {};
                scope.$watch(scope.model, function() {
                    scope.init();
                });


                scope.sort = function(keyname) {
                    scope.sortKey = keyname; //set the sortKey to the param passed
                    scope.reverse = !scope.reverse; //if true make it false and vice versa
                };
                scope.exportexcel = function(array, columns) {
                    var cloumsarr = [];
                    var selectarray = [];
                    _.each(_.filter(columns, function(item) { return item.key !== "" && item.key !== undefined; }), function(inneritem) {
                        cloumsarr.push({ columnid: inneritem.key, title: inneritem.text });
                    });
                    var options = {
                        headers: true,
                        columns: cloumsarr
                    };
                    var join = _.map(cloumsarr, 'columnid').join(',');
                    var select = 'SELECT ' + join + ' INTO  XLSX("Reports.xlsx",?) FROM ?';
                    alasql(select, [options, array]);
                };

                scope.init();
            }
        };
    }
]);