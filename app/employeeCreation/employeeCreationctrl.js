 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('employeeCreationCtrl', controller);

     controller.$inject = ['employeeCreationModel', 'authSvc'];

     function controller(employeeCreationModel, authSvc) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = employeeCreationModel;
             model.reset();
             model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
         };

         vm.init();

     }
 })();