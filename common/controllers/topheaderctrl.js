(function(angular) {
    'use strict';
    /** @ngInject */
    function ControllerCtrl(scope, dashboardModel) {
        var vm = this;
        // vm.model = model = dashboardModel;

        vm.name = sessionStorage.getItem("LoginEmpName");
        // vm.name = vm.model.loginarray;

    }
    angular
        .module('Kaakateeya')
        .controller('headerctrl', ['$scope', 'dashboardModel', ControllerCtrl]);

}(angular));