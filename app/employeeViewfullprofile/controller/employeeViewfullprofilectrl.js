 (function() {
     'use strict';

     function controller(employeeViewfullprofileModel, scope) {
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = employeeViewfullprofileModel;
             vm.model.scope = scope;
             if (parseInt(model.stateprofileid) !== 0) {
                 model.textboxshowhide = true;
                 model.EmpViewfullProfile(model.stateprofileid);
             } else {
                 model.textboxshowhide = false;
             }
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('employeeViewfullprofileCtrl', controller);
     controller.$inject = ['employeeViewfullprofileModel', '$scope'];

 })(angular);