(function(angular) {
    'use strict';
    /** @ngInject */
    function ControllerCtrl(scope, authSvc, $uibModal, $state) {
        var vm = this;
        var modalpopupopen;
        vm.lock = false;
        vm.CurrentDate = new Date();
        vm.logincounts = [];
        vm.initheader = function() {
            var empname = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            // authSvc.getmacaddress();
            // authSvc.getClientIp();
            vm.name = authSvc.LoginEmpName();
            vm.empphoto = authSvc.empphoto();

        };
        vm.initheader();

        vm.logout = function() {
            vm.name = "";
            $state.go("login", {});
            authSvc.logout();
        };
        vm.lockscreen = function() {
            vm.lock = true;
            vm.passwordemployee = "";
        };
    }
    angular
        .module('Kaakateeya')
        .controller('headerctrl', ['$scope', 'authSvc', '$uibModal', '$state',
            ControllerCtrl
        ]);

}(angular));