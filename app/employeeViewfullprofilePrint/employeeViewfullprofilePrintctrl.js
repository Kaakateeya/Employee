 (function() {
     'use strict';

     function controller(employeeViewfullprofileModel, scope, authSvc) {
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = employeeViewfullprofileModel();
             vm.model.scope = scope;
             model.viewprofilearray = [];
             model.aboutmyself = {};
             model.personalinfo = {};
             model.basicinfo = [];
             model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
             if (parseInt(model.stateprofileid) !== 0) {
                 model.textboxshowhide = true;
                 model.EmpViewfullProfile(model.stateprofileid);
             } else {
                 model.textboxshowhide = false;
             }
         };
         vm.divInfo = {
             printDivId: 'printThisElement',
             styles: ['/app/employeeViewfullprofilePrint/style.css'], //Extra Styles
             title: 'View Profile',
         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('employeeViewfullprofilePrintCtrl', controller);
     controller.$inject = ['employeeViewfullprofilePrintModel', '$scope', 'authSvc'];

 })(angular);