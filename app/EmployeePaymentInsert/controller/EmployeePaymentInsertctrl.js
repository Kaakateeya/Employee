 (function() {
     'use strict';

     function Controller(EmployeePaymentInsertModel, stateParams) {
         debugger;
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = EmployeePaymentInsertModel;
             vm.model.getpaymentProfile(stateParams.ProfileID);
         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('EmployeePaymentInsertCtrl', Controller)
     Controller.$inject = ['EmployeePaymentInsertModel', '$stateParams'];
 })(angular);