(function(angular) {
    'use strict';
    /** @ngInject */
    angular
        .module('Kaakateeya')
        .controller('headerctrl', ['$scope', 'topheadermodel',
            function(scope, topheadermodel) {
                var vm = this,
                    model = {};
                vm.initheader = function() {
                    vm.model = model = topheadermodel;
                    topheadermodel.init();
                };
                vm.initheader();
            }
        ]);

}(angular));