 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('employeeCreationCtrl', ['employeeCreationModel', 'authSvc', '$scope', function(employeeCreationModel, authSvc, scope) {
             /* jshint validthis:true */
             var vm = this,
                 model;
             vm.init = function() {
                 vm.model = model = employeeCreationModel;
                 model.scope = scope;
                 model.init();
                 model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                 model.empStatus = '423';
                 model.data = [];
                 model.selectedIndex = 0;
                 model.reset();
             };
             vm.init();
         }]);
 })();