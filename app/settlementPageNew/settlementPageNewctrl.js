 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('settlementPageNewCtrl', controller);

     controller.$inject = ['settlementPageNewModel', '$scope', 'authSvc'];

     function controller(settlementPageNewModel, scope, authSvc) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = settlementPageNewModel;
             vm.model.panelbodyhide = true;
             model.scope = scope;
             model.reset();
             model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
         };

         vm.init();
     }
 })();