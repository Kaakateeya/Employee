 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('settleDeleteProfileseReportCtrl', controller);

     controller.$inject = ['settleDeleteProfileseReportModel', '$scope', 'authSvc'];

     function controller(settleDeleteProfileseReportModel, scope, authSvc) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {

             vm.model = model = settleDeleteProfileseReportModel;
             model.Admin = authSvc.isAdmin();
             model.Profileownerbind();
             model.reset();
             model.scope = scope;
             model.Managementid = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
             model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
         };

         vm.init();

     }
 })();