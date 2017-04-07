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
                IDs: '=',
                expand: '='
            },
            templateUrl: "templates/dynamicBootstrapTable.html",
            link: function(scope, element, attrs) {
                var rem = scope.removeobjs;
                scope.Datatableshow = true;
                scope.dynamictableshow = false;
                scope.tablebtnshow = false;
                var table = '';
                // attrs.id = scope.IDs;
                scope.ID = "ID"; //attrs.id;
                scope.appendID = '';
                table = $('#' + scope.ID + ' .Datatable');
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
                    pageSize: "10",
                    detailView: scope.expand === true ? true : false,
                    onExpandRow: playbuttonexpand
                };
                var cells = 8;

                scope.backtosearchpage = function() {
                    scope.dynamictableshow = false;
                    scope.$emit("backsearchshowcontrols");
                };
                scope.backtosearchpage();

                function rowStyle(row, index) {
                    var classes = ['settled', 'Deleted', 'inactive'];
                    var test = [
                        { StatusID: 57, classes: 'settled' },
                        { StatusID: 393, classes: 'settled' },
                        { StatusID: 56, classes: 'Deleted' },
                        { StatusID: 394, classes: 'Deleted' },
                        { StatusID: 55, classes: 'inactive' }
                    ];

                    return {
                        classes: _.where(test, { StatusID: row.ProfileStatusID }).length > 0 ? _.where(test, { StatusID: row.ProfileStatusID })[0].classes : ''
                    };
                }

                function detailFormatter(index, row) {
                    var html = [];
                    $.each(row, function(key, value) {

                        html.push('<p><b>' + key + ':</b> ' + value + '</p>');
                    });
                    return html.join('');
                }

                function playbuttonexpand(index, row, $detail) {
                    commonpage.buildTable($detail.html('<table></table>').find('table'), row.ProfileID);
                }
                scope.BootstrapTableLoad = function() {
                    datatbaleoptions.height = scope.height || 650;
                    datatbaleoptions.pageSize = scope.pagesize || 10;
                    if (scope.removeobjs !== null && scope.removeobjs !== undefined)
                        var filteredColumns = _.difference(_.keys(tableArray[0]), scope.removeobjs);
                    datatbaleoptions.columns = commonpage.setColumns(filteredColumns || _.keys(tableArray[0]));
                    $table = $('#ID');
                    $table.bootstrapTable(datatbaleoptions);
                    $table.bootstrapTable('load', tableArray);

                    return false;
                };

                scope.BootstrapTableAppend = function(darray) {
                    if (darray.length > 0) {
                        datatbaleoptions.height = scope.height || 650;
                        datatbaleoptions.pageSize = scope.pagesize || 10;
                        if (scope.removeobjs !== null && scope.removeobjs !== undefined)
                            var filteredColumns = _.difference(_.keys(tableArray[0]), scope.removeobjs);
                        datatbaleoptions.columns = commonpage.setColumns(filteredColumns || _.keys(tableArray[0]));
                        $table = $('#ID');
                        $table.bootstrapTable(datatbaleoptions);
                        $table.bootstrapTable('prepend', darray);
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

                scope.$on('submittable', function(event, array, frompage) {
                    scope.tablebtnshow = false;
                    scope.dynamictableshow = true;
                    tableArray = array;
                    scope.BootstrapTableLoad(array);
                });
                scope.$on('submittablesearch', function(event, array, frompage) {
                    scope.tablebtnshow = true;
                    scope.dynamictableshow = true;
                    tableArray = array;
                    scope.BootstrapTableLoad(array);
                });


            }

        };
    }
]);