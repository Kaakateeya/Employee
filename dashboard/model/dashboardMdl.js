(function(angular) {
    'use strict';

    function factory($http, dashboardServices, route) {
        var model = {};
        model.init = function() {
            model.tabledata(2, 319, 1, 10, '', 'pageload', undefined, 0);
            return model;
        };
        model.tabledata = function(empid, branchcode, frompage, topage, tablename, type, array, slideflag) {
            dashboardServices.getlandingdata(empid, branchcode, frompage, topage, tablename, slideflag).then(function(response) {
                if (type === "export") {
                    model.exportData('exportableproceeding');
                } else if (type === 'pageload') {
                    model.landingItems = response.data;
                } else if (type === 'load') {
                    _.each(response.data[0], function(inneritem) {
                        array.push(inneritem);
                    });
                } else {
                    if (frompage === 1) {
                        debugger;
                        model.slidearray = response.data[0];

                    } else {
                        _.each(response.data, function(inneritem) {
                            model.slidearray.push(inneritem);
                        });
                    }
                }

            });

        };
        model.loadmore = function(empid, branchcode, frompage, topage, tablename, type, array, slideflag) {
            switch (type) {
                case "export":
                case "load":
                    model.tabledata(empid, branchcode, frompage, topage, tablename, type, array, slideflag);
                    break;
            }

        };
        model.exportData = function(id) {
            var blob = new Blob([document.getElementById(id).innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "Report.xls");
        };
        model.slideshowfunction = function(flag, empid, branchcode, frompage, topage, tablename, type, array, slideflag) {
            debugger;
            model.slideshowtrue = flag;
            if (flag === true) {
                if (frompage === 1) {
                    array = [];
                }
                model.tabledata(empid, branchcode, frompage, topage, tablename, type, array, slideflag);
            }
        };
        return model.init();
    }
    angular
        .module('Kaakateeya')
        .factory('dashboardModel', factory);
    factory.$inject = ['$http', 'dashboardServices', 'route'];
})(angular);