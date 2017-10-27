 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('noProfilegradingCtrl', controller);

     controller.$inject = ['noProfilegradingModel', '$scope', 'authSvc'];

     function controller(noProfilegradingModel, scope, authSvc) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = noProfilegradingModel;
             model.panelbodyhide = true;
             model.scope = scope;
             model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
             model.reset();

         };

         vm.init();

     }
 })();