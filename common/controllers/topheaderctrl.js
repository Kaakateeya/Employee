(function(angular) {
    'use strict';
    /** @ngInject */
    angular
        .module('Kaakateeya')
        .controller('headerctrl', ['$scope', 'topheadermodel', 'authSvc',
            function(scope, topheadermodel, authSvc) {
                var vm = this,
                    model = {};
                vm.initheader = function() {
                    if (authSvc.LoginEmpid() !== topheadermodel.empid) {
                        vm.model = model = topheadermodel.init();
                    } else {
                        vm.model = model = topheadermodel;
                    }
                };
                vm.initheader();
            }
        ]);

}(angular));