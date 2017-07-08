 (function() {
     'use strict';

     function Controller(EmployeePaymentInsertModel, stateParams, scope) {
         var vm = this,
             model;

         vm.reset = function() {
             debugger;
             model.PiObj = {};
             model.custobj = {};
             model.txtAmountPaid =
                 vm.model.PiObj.txtAgreedAmt =
                 vm.model.PiObj.txtSettlementAmount =
                 vm.model.PiObj.rdnServicetax =
                 vm.model.PiObj.txtbillno =
                 vm.model.PiObj.txttransactionid =
                 vm.model.PiObj.txtcheckno =
                 vm.model.PiObj.txtbranch =
                 vm.model.PiObj.txtbankname =
                 vm.model.PiObj.txtplace = '';
             model.txtpayDescription = '';
             model.rbtnPaymode = '';
             model.rbtnmail = '';
         };

         vm.init = function() {
             vm.model = model = {};
             vm.reset();
             vm.model = model = EmployeePaymentInsertModel;
             model.scope = scope;
             vm.model.getpaymentProfile(stateParams.ProfileID);
             vm.model.PiObj.rbtnmail = 1;
         };
         vm.Number = Number;
         vm.init();

     }
     angular
         .module('Kaakateeya')
         .controller('EmployeePaymentInsertCtrl', Controller);
     Controller.$inject = ['EmployeePaymentInsertModel', '$stateParams', '$scope'];
 })(angular);