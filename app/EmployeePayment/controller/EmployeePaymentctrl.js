 (function() {
     'use strict';

     function Controller(EmployeePaymentmodel, scope, $location) {
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
             if (model.txtProfileID !== "" && model.txtProfileID !== null && model.txtProfileID !== undefined && model.txtProfileID !== "undefined") {
                 model.EmployeePayment(model.txtProfileID);
             }
         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('EmployeePaymentCtrl', Controller);
     Controller.$inject = ['EmployeePaymentmodel', '$scope', '$location'];
 })(angular);