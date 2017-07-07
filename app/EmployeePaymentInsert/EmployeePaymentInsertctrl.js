 (function() {
     'use strict';

     function Controller(EmployeePaymentInsertModel, stateParams, scope) {
         var vm = this,
             model;

         vm.reset = function() {
             debugger;
             model.custobj = {};
             model.txtAmountPaid =
                 vm.model.txtAgreedAmt =
                 vm.model.txtSettlementAmount =
                 vm.model.rdnServicetax =
                 vm.model.txtbillno =
                 vm.model.txttransactionid =
                 vm.model.txtcheckno =
                 vm.model.txtbranch =
                 vm.model.txtbankname =
                 vm.model.txtplace = '';
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