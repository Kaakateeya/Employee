(function() {
    'use strict';




    function controller(editViewprofileModel, scope, state) {
        /* jshint validthis:true */
        var vm = this,
            model;

        vm.init = function() {
            vm.model = model = editViewprofileModel;
            vm.model.scope = scope;

        };

        vm.init();
    }

    angular.module('Kaakateeya').controller('editViewprofileCtrl', ['editViewprofileModel', '$scope', '$state', controller]);
})();