 (function() {
     'use strict';

     function controller(employeeViewfullprofileModel, scope) {
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = employeeViewfullprofileModel;
             model.EmpViewfullProfile();
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('employeeViewfullprofileCtrl', controller);
     controller.$inject = ['employeeViewfullprofileModel'];

 })(angular);