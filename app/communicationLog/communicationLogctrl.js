 (function(angular) {
     'use strict';

     function controller($location, communicationLogModel, scope, authSvc) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = communicationLogModel();
             model.scope = scope;
             model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
         };
         vm.init();
     }

     angular
         .module('Kaakateeya')
         .controller('communicationLogCtrl', controller);
     controller.$inject = ['$location', 'communicationLogModel', '$scope', 'authSvc'];
 })(angular);