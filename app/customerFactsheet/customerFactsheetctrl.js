 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('customerFactsheetCtrl', ['customerFactsheetModel', '$scope', 'authSvc', function(customerFactsheetModel, scope, authSvc) {
             /* jshint validthis:true */
             var vm = this,
                 model;
             vm.init = function() {
                 vm.model = model = customerFactsheetModel;
                 model.scope = scope;
                 model.panelbodyhide = true;
                 model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                 model.resetfactsheet();
             };
             vm.init();
         }]);
 })();