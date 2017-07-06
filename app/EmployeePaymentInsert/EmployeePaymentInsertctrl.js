 (function() {
     'use strict';

     function Controller(EmployeePaymentInsertModel, stateParams, scope) {
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = {};
             vm.model = model = EmployeePaymentInsertModel;
             model.scope = scope;
             vm.model.getpaymentProfile(stateParams.ProfileID);
             vm.model.PiObj.rbtnmail = 1;
         };
         vm.Number = Number;
         vm.init();

     }
     angular
         .module('Kaakateeya')
         .controller('EmployeePaymentInsertCtrl', Controller);
     Controller.$inject = ['EmployeePaymentInsertModel', '$stateParams', '$scope'];
 })(angular);