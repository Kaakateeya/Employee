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
            vm.model.obj.ProfileIDsearch = '';
            vm.model.scope = scope;
        };
        vm.test = [];

        // scope.testtable = function() {
        //     alert(111);
        //     scope.$broadcast('submittable', arr, 'ftable');
        // };






        vm.init();
    }

    angular.module('Kaakateeya').controller('ViewAllCustomersCtrl', ['ViewAllCustomerModel', '$scope', '$state', Controller]);

})(angular);