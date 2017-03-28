(function(angular) {
    'use strict';

    function Controller(ViewAllCustomerModel, scope, $state) {

        var vm = this;
        var arr = [{ Name: 'asdsada', ProfileID: '222222' },
            { Name: 'asdsada', ProfileID: '222222' },
            { Name: 'asdsada', ProfileID: '222222' },
            { Name: 'asdsada', ProfileID: '222222' },
            { Name: 'asdsada', ProfileID: '222222' },
            { Name: 'asdsada', ProfileID: '222222' }
        ];
        vm.init = function() {
            vm.model = ViewAllCustomerModel;
            vm.model.scope = scope;
        };
        vm.test = [];

        vm.init();
    }

    angular.module('Kaakateeya').controller('ViewAllCustomersCtrl', ['ViewAllCustomerModel', '$scope', '$state', Controller]);

})(angular);