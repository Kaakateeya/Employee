 (function() {
     'use strict';



     function controller(assignSettingsModel, authSvc, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = assignSettingsModel();
             model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
             model.isAdmin = authSvc.isAdmin() !== undefined && authSvc.isAdmin() !== null && authSvc.isAdmin() !== "" ? authSvc.isAdmin() : "";
             model.MyProfilePageLoad();
             model.scope = scope;
             model.assignsettingsdata = [];
         };

         vm.init();

     }
     angular
         .module('Kaakateeya')
         .controller('assignSettingsCtrl', controller);

     controller.$inject = ['assignSettingsModel', 'authSvc', '$scope'];
 })();