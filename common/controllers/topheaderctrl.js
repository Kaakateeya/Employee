(function(angular) {
    'use strict';
    /** @ngInject */
    function ControllerCtrl(scope, authSvc, uibModal, dashboardServices, dashboardModel) {
        var vm = this;
        // vm.model = model = dashboardModel;
        var modalpopupopen;
        vm.showpopup = function(url, scope, size) {
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
        };
        vm.initheader = function() {
            var empname = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            if (empname === "") {
                vm.showpopup('loginContent.html', scope);
            } else {
                vm.name = authSvc.LoginEmpName();
            }
        };
        vm.initheader();
        vm.closepopup = function() {
            modalpopupopen.close();
        };
        vm.loginsubmit = function(form) {
            dashboardServices.getloginpage(form).then(function(response) {
                authSvc.clearUserSessionDetails();
                if (response.data !== undefined && response.data !== "" && response.data !== null) {
                    vm.loginarray = response.data;
                    authSvc.user(response.data.m_Item1);
                    vm.name = response.data.m_Item1.FirstName + " " + response.data.m_Item1.LastName;
                    dashboardModel.init();
                }
                modalpopupopen.close();

            });
        };
        vm.logout = function() {
            vm.showpopup('loginContent.html', scope);
            vm.name = "";
            authSvc.logout();
        };
    }
    angular
        .module('Kaakateeya')
        .controller('headerctrl', ['$scope', 'authSvc', '$uibModal', 'dashboardServices', 'dashboardModel',
            ControllerCtrl
        ]);

}(angular));