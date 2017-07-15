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
                        model.scope = scope;
                    } else {
                        vm.model = model = topheadermodel;
                        model.scope = scope;
                    }
                };
                vm.initheader();
            }
        ]);

}(angular));