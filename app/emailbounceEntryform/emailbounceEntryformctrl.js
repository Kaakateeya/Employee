 (function() {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('emailbounceEntryformCtrl', ['emailbounceEntryformModel', '$scope', 'authSvc',
             function(emailbounceEntryformModel, scope, authSvc) {
                 /* jshint validthis:true */
                 var vm = this,
                     model;
                 vm.init = function() {
                     vm.model = model = emailbounceEntryformModel;
                     model.scope = scope;
                     model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                     model.isAdmin = authSvc.isAdmin() !== undefined && authSvc.isAdmin() !== null && authSvc.isAdmin() !== "" ? authSvc.isAdmin() : "";
                     model.clearcontrols();
                     model.opendiv = true;
                 };
                 vm.init();
             }
         ]);
 })();