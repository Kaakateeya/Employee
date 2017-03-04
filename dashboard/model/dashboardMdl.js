(function(angular) {
    'use strict';

    function factory($http, dashboardServices) {
        var model = {};
        model.init = function() {
            model.tabledata(2, 319, 1, 10, '', 'pageload');
            return model;
        };
        model.tabledata = function(empid, branchcode, frompage, topage, tablename, type, array) {
            dashboardServices.getlandingdata(empid, branchcode, frompage, topage, tablename, 0).then(function(response) {
                if (type === "export") {
                    model.exportData('exportableproceeding');
                } else if (type === 'pageload') {
                    model.landingItems = response.data;
                } else {
                    _.each(response.data[0], function(inneritem) {
                        array.push(inneritem);
                    });
                }

            });

        };
        model.loadmore = function(empid, branchcode, frompage, topage, tablename, type, array) {
            switch (type) {
                case "export":
                case "load":
                    model.tabledata(empid, branchcode, frompage, topage, tablename, type, array);
                    break;
            }

        };
        model.exportData = function(id) {
            var blob = new Blob([document.getElementById(id).innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "Report.xls");
        };
        model.slideshowfunction = function(flag) {
            model.slideshowtrue = flag;
        };
        return model.init();
    }
    angular
        .module('Kaakateeya')
        .factory('dashboardModel', factory);
    factory.$inject = ['$http', 'dashboardServices'];
})(angular);