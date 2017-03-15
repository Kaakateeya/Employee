(function(angular) {
    'use strict';

    function factory($http, dashboardServices, uibModal, authSvc) {
        var model = {};
        var flag = 0;
        model.frompage = 6;
        model.topage = 10;
        model.tablenameflag = "";
        model.tabledata = function(empid, branchcode, frompage, topage, tablename, type, array, slideflag) {
            dashboardServices.getlandingdata(empid, branchcode, frompage, topage, tablename, slideflag).then(function(response) {
                if (response !== undefined && response !== null && response !== "" && response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0) {
                    console.log(response);
                    if (type === 'pageload') {
                        model.landingItems = response.data;
                    } else if (type === 'load') {
                        debugger;
                        _.each(response.data[0], function(inneritem) {
                            array.push(inneritem);
                        });
                    } else {
                        if (frompage === 1) {
                            model.slidearray = response.data[0];
                        } else {
                            _.each(response.data, function(inneritem) {
                                model.slidearray.push(inneritem);
                            });
                        }
                    }
                }
            });
        };
        model.loadmore = function(empid, branchcode, frompage, topage, tablename, type, array, slideflag) {
            switch (type) {
                case "export":
                    model.exportData('exportableproceeding');
                    break;
                case "load":

                    if (model.tablenameflag !== tablename) {
                        model.tablenameflag = tablename;
                        model.frompage = 6;
                        model.topage = 10;
                    } else {
                        model.frompage = topage + 1;
                        model.topage = topage + 5;
                    }
                    model.tabledata(empid, branchcode, model.frompage, model.topage, tablename, type, array, slideflag);
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
            model.slideshowtrue = flag;
            if (flag === true) {
                model.tabledata(empid, branchcode, frompage, topage, tablename, type, array, slideflag);
            }
        };
        model.init = function() {
            model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            model.empBranchID = authSvc.empBranchID() !== undefined && authSvc.empBranchID() !== null && authSvc.empBranchID() !== "" ? authSvc.empBranchID() : "";
            if (model.empid !== null && model.empid !== "" && model.empBranchID !== null && model.empBranchID !== "") {
                model.tabledata(model.empid, model.empBranchID, 1, 5, '', 'pageload', undefined, 0);
            }
        };
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('dashboardModel', factory);
    factory.$inject = ['$http', 'dashboardServices', '$uibModal', 'authSvc'];
})(angular);