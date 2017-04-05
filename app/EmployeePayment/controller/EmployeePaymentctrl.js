 (function() {
     'use strict';

     function Controller(EmployeePaymentmodel, scope) {
         debugger;
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = EmployeePaymentmodel;
             model.scope = scope;
             model.txtProfileID = "";
             model.freshLink = false;
             model.CustName = '';
             model.ProfileOwner = '';
             model.ProfileID = '';
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('EmployeePaymentCtrl', Controller);
     Controller.$inject = ['EmployeePaymentmodel', '$scope'];
 })(angular);