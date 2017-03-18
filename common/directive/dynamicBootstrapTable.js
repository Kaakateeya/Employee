app.directive("bootstrapTable", ['commonpage', '$timeout',
    function(commonpage, timeout) {
        return {
            restrict: "E",
            scope: {
                array: '=',
                removeobjs: '=',
                height: '=',
                pagesize: '=',
                loadtype: '=',
                btnclick: '=',
                IDs: '='
            },
            templateUrl: "templates/dynamicBootstrapTable.html",
            link: function(scope, element, attrs) {
                var rem = scope.removeobjs;
                //scope.Datatableshow = true;
                var table = '';

                // attrs.id = scope.IDs;
                scope.ID = attrs.id;

                scope.appendID = '';
                table = $('#' + scope.ID + ' .Datatable');
                scope.btnclicktruefalse = scope.btnclick === 'true' ? true : false;
                var tableArray = scope.array;
                scope.Datatableshow = true;
                var datatbaleoptions = {
                    exportDataType: 'all',
                    maintainSelected: true,
                    smartDisplay: true,
                    trimOnSearch: true,
                    showFooter: false,
                    cache: false,
                    escape: true,
                    showRefresh: false,
                    showHeader: true,
                    showPaginationSwitch: true,
                    showToggle: true,
                    detailView: false,
                    onlyInfoPagination: false,
                    striped: false,
                    showColumns: true,
                    showExport: true,
                    search: true,
                    pagination: true,
                    rowStyle: rowStyle,
                    pageList: "[10,50,100]",
                    paginationFirstText: "First",
                    paginationPreText: "Previous",
                    paginationNextText: "Next",
                    paginationLastText: "Last",
                    detailFormatter: detailFormatter,
                    mobileResponsive: "true",
                    showLoading: true,
                    fixedColumns: true,
                    fixedNumber: 1,
                    showMultiSort: true,
                    pageSize: "10"
                };

                function rowStyle() {
                    return false;
                }

                function detailFormatter(index, row) {
                    var html = [];
                    $.each(row, function(key, value) {

                        html.push('<p><b>' + key + ':</b> ' + value + '</p>');
                    });
                    return html.join('');
                }

                scope.BootstrapTableLoad = function() {
                    datatbaleoptions.height = scope.height || 650;
                    datatbaleoptions.pageSize = scope.pagesize || 10;
                    if (scope.removeobjs !== null && scope.removeobjs !== undefined)
                        var filteredColumns = _.difference(_.keys(tableArray[0]), scope.removeobjs);
                    datatbaleoptions.columns = commonpage.setColumns(filteredColumns || _.keys(tableArray[0]));
                    table.bootstrapTable(datatbaleoptions);

                    table.bootstrapTable('load', tableArray);
                    return false;
                };

                scope.BootstrapTableAppend = function(darray) {

                    if (darray.length > 0) {
                        table = $('#ftable .Datatable');
                        scope.Datatableshow = true;
                        table.bootstrapTable('prepend', darray);
                        return false;
                    }
                    return false;
                };

                scope.loadmore = function(id) {
                    scope.appendID = id;
                    scope.$emit('loadmore');
                };

                scope.$on('tableAppend', function(event, array) {
                    scope.BootstrapTableAppend(array);
                });

                if (scope.btnclicktruefalse === true) {
                    scope.BootstrapTableLoad();
                }
                scope.$on('submittable', function(event, array, frompage) {

                    // scope.Datatableshow = false;
                    scope.ID = attrs.id;
                    // scope.ID = "ftable";
                    table = $('#' + scope.ID + ' .Datatable');
                    tableArray = array;
                    scope.BootstrapTableLoad();

                    //scope.flag = 1;
                });
            }

        };
    }
]);