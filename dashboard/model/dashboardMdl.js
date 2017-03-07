(function(angular) {
    'use strict';

    function factory($http, dashboardServices, uibModal) {
        var model = {},
            modalpopupopen;
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
            model.slideshowtrue = flag;
            if (flag === true) {
                model.tabledata(empid, branchcode, frompage, topage, tablename, type, array, slideflag);
            }
        };
        model.showpopup = function(url, scope, size) {
            modalpopupopen = uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: url,
                scope: scope,
                backdrop: 'static',
                size: size
                    // keyboard: false
                    // windowClass: 'zindex'

            });
            return model;
        };
        model.closepopup = function() {
            modalpopupopen.close();
            return model;
        };
        model.loginsubmit = function(form) {
            dashboardServices.getloginpage(form).then(function(response) {
                console.log(response);
                if (response.data !== undefined && response.data !== "" && response.data !== null) {
                    model.loginarray = response.data;
                    sessionStorage.removeItem("LoginEmpid");
                    sessionStorage.removeItem("LoginEmpName");
                    sessionStorage.removeItem("empBranchID");
                    sessionStorage.removeItem("isAdmin");
                    sessionStorage.removeItem("isManagement");
                    sessionStorage.removeItem("empRegionID");
                    model.tabledata(response.data.m_Item1.EmpID, response.data.m_Item1.BranchID, 1, 10, '', 'pageload', undefined, 0);
                    sessionStorage.setItem("LoginEmpid", response.data.m_Item1.EmpID);
                    sessionStorage.setItem("LoginEmpName", response.data.m_Item1.FirstName + " " + response.data.m_Item1.LastName);
                    sessionStorage.setItem("empBranchID", response.data.m_Item1.BranchID);
                    sessionStorage.setItem("isAdmin", response.data.m_Item1.isAdmin);
                    sessionStorage.setItem("isManagement", response.data.m_Item1.isManagement);
                    sessionStorage.setItem("empRegionID", response.data.m_Item1.RegionID);
                    model.testtt = 'ram';
                }
                modalpopupopen.close();
            });
            return model;

        };

        // return model.init();
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('dashboardModel', factory);
    factory.$inject = ['$http', 'dashboardServices', '$uibModal'];
})(angular);