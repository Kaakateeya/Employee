 (function() {
     'use strict';

     function Controller(EmployeePaymentInsertModel, stateParams, scope) {
         var vm = this,
             model;

         vm.reset = function() {
             model.custobj = {};
             vm.model.PiObj = {};
             model.txtpayDescription = '';
             model.rbtnPaymode = '';
             model.rbtnmail = '';
             model.StartDateparam = '';
             model.endDateparam = '';
         };

         vm.init = function() {

             vm.model = model = {};
             vm.model = model = EmployeePaymentInsertModel;
             model.scope = scope;
             vm.reset();
             vm.model.typeofprofile = parseInt(stateParams.paymentID);
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