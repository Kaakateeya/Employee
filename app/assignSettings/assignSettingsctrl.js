 (function() {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('assignSettingsCtrl', ['assignSettingsModel', 'authSvc', '$scope', function(assignSettingsModel, authSvc, scope) {
             /* jshint validthis:true */
             var vm = this,
                 model;
             vm.init = function() {
                 vm.model = model = assignSettingsModel;
                 model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                 model.isAdmin = authSvc.isAdmin() !== undefined && authSvc.isAdmin() !== null && authSvc.isAdmin() !== "" ? authSvc.isAdmin() : "";
                 model.MyProfilePageLoad();
                 model.scope = scope;
                 model.assignsettingsdata = [];
                 model.mpObj.rdnGender = "";
                 model.mpObj.rdnPayments = "0";
                 model.opendiv = true;
             };
             vm.init();
         }]);
 })();