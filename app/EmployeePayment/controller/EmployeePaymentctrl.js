 (function() {
     'use strict';

     function Controller(EmployeePaymentmodel, scope, $location, authSvc) {
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = EmployeePaymentmodel;
             model.scope = scope;
             model.txtProfileID = "";
             model.freshLink = false;
             model.CustName = '';
             model.ProfileOwner = '';
             model.ProfileID = '';
             model.searchObjectquery = $location.search();
             var meKey = Object.getOwnPropertyNames(model.searchObjectquery)[0];
             model.txtProfileID = model.searchObjectquery[meKey];
             model.isManagement = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
             model.isAdmin = authSvc.isAdmin() !== undefined && authSvc.isAdmin() !== null && authSvc.isAdmin() !== "" ? authSvc.isAdmin() : "";
             if (model.txtProfileID !== "" && model.txtProfileID !== null && model.txtProfileID !== undefined && model.txtProfileID !== "undefined") {
                 model.EmployeePayment(model.txtProfileID);
             }
         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('EmployeePaymentCtrl', Controller);
     Controller.$inject = ['EmployeePaymentmodel', '$scope', '$location', 'authSvc'];
 })(angular);