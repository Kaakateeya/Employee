 (function() {
     'use strict';

     function Controller(EmployeePaymentmodel, scope) {
         debugger;
         var vm = this,
             model;

         vm.init = function() {

             vm.model = model = EmployeePaymentmodel;
             model.scope = scope;
             model.freshLink = false;
             model.txtProfileID = '';
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('EmployeePaymentCtrl', Controller);
     Controller.$inject = ['EmployeePaymentmodel', '$scope'];
 })(angular);