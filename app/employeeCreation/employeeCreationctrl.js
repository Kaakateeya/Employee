 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('employeeCreationCtrl', controller);

     controller.$inject = ['employeeCreationModel', 'authSvc', '$scope'];

     function controller(employeeCreationModel, authSvc, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = employeeCreationModel;
             model.reset();
             model.scope = scope;
             model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
             model.empStatus = '423';
             model.data = [];
         };

         vm.init();

     }
 })();