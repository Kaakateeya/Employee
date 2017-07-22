angular.module('Kaakateeya').directive("complexGridNew", function() {
        return {
            restrict: "E",           
            templateUrl: "directives/complex-grid-new/index.html",
            link: function(scope, element, attrs) {                
            function makeRandomRows (colData) {
                    var rows = [];
                    for (var i = 0; i < 500; i++) {
                        rows.push($.extend({
                            index: i,
                            id: 'row ' + i,
                            name: 'GOOG' + i
                        }, colData));
                    }
                    return rows;
            }
            scope.bsTableControl = {
                options: {
                    data: makeRandomRows(),
                    rowStyle: function (row, index) {
                        return { classes: 'none' };
                    },
                    cache: false,
                    height: 400,
                    striped: true,
                    pagination: true,
                    pageSize: 10,
                    pageList: [5, 10, 25, 50, 100, 200],
                    search: true,
                    showColumns: true,
                    showRefresh: false,
                    minimumCountColumns: 2,
                    clickToSelect: false,
                    showToggle: true,
                    maintainSelected: true,
                    columns: [{
                        field: 'state',
                        checkbox: true
                    }, {
                        field: 'index',
                title: '#',
                        align: 'right',
                        valign: 'bottom',
                        sortable: true
                    }, {
                        field: 'id',
                        title: 'Item ID',
                        align: 'center',
                        valign: 'bottom',
                        sortable: true
                    }, {
                        field: 'name',
                        title: 'Item Name',
                        align: 'center',
                        valign: 'middle',
                        sortable: true
                    }, {
                        field: 'workspace',
                        title: 'Workspace',
                        align: 'left',
                        valign: 'top',
                        sortable: true
                    }, {
                        field: 'flag',
                        title: 'Flag',
                        align: 'center',
                        valign: 'middle',
                        clickToSelect: false,
                        formatter: flagFormatter,
                        // events: flagEvents
                    }]
                }
            };
            function flagFormatter(value, row, index) {
                return '<img src="' + row.flagImage + '"/>'
            }

            }
        };
    }
);
