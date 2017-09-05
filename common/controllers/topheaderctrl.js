(function(angular) {
    'use strict';
    /** @ngInject */
    angular
        .module('Kaakateeya')
        .controller('headerctrl', ['$scope', 'topheadermodel', 'authSvc', '$http',
            function(scope, topheadermodel, authSvc, $http) {
                var vm = this,
                    model = {};
                vm.initheader = function() {

                    if (authSvc.LoginEmpid() !== topheadermodel.empid) {
                        vm.model = model = topheadermodel.init();
                        model.scope = scope;
                        model.usernameemployeeid = sessionStorage.getItem("usernameemployeeid");
                        model.unpaidmember = false;
                    } else {
                        vm.model = model = topheadermodel;
                        model.scope = scope;
                        model.usernameemployeeid = sessionStorage.getItem("usernameemployeeid");
                        model.unpaidmember = false;
                    }
                    $http.get('your-server-endpoint');
                };
                vm.initheader();
            }
        ]);

}(angular));