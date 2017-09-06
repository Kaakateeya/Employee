 (function() {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('EmployeePaymentCtrl', ['EmployeePaymentmodel', '$scope', '$location', 'authSvc', '$stateParams',
             function(EmployeePaymentmodel, scope, $location, authSvc, stateParams) {
                 var vm = this,
                     model;
                 vm.init = function() {
                     vm.model = model = EmployeePaymentmodel;
                     model.scope = scope;
                     model.data = [];
                     model.txtProfileID = "";
                     model.freshLink = false;
                     model.CustName = '';
                     model.ProfileOwner = '';
                     model.ProfileID = '';
                     model.searchObjectquery = $location.search();
                     model.updatepaymentllink = false;
                     var meKey = Object.getOwnPropertyNames(model.searchObjectquery)[0];
                     model.txtProfileID = model.searchObjectquery[meKey];
                     model.isManagement = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
                     model.isAdmin = authSvc.isAdmin() !== undefined && authSvc.isAdmin() !== null && authSvc.isAdmin() !== "" ? authSvc.isAdmin() : "";
                     model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";

                     if (model.txtProfileID !== "" && model.txtProfileID !== null && model.txtProfileID !== undefined && model.txtProfileID !== "undefined") {
                         model.EmployeePayment(model.txtProfileID);
                     } else if (stateParams.ProfileID && stateParams.ProfileID !== '0') {
                         model.txtProfileID = stateParams.ProfileID;
                         model.EmployeePayment(model.txtProfileID);
                     }
                     model.isDisabledsubmit = false;

                 };
                 vm.init();
             }
         ]);
 })(angular);