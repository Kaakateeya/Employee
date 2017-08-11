 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('EmployeePaymentInsertnewCtrl', controller);

     controller.$inject = ['EmployeePaymentInsertnewModel', '$stateParams', '$scope'];

     function controller(EmployeePaymentInsertnewModel, stateParams, scope) {
         var vm = this,
             model;

         vm.reset = function() {
             model.custobj = {};
             vm.model.PiObj = {};
             model.txtpayDescription = '';
             model.rbtnPaymode = '';
             model.rbtnmail = '';
             model.StartDateparam = '';
             model.endDateparam = '';
         };

         vm.init = function() {
             vm.model = model = {};
             vm.model = model = EmployeePaymentInsertnewModel;
             model.scope = scope;
             vm.reset();
             vm.model.typeofprofile = parseInt(stateParams.paymentID);
             vm.model.getpaymentProfile(stateParams.ProfileID);
             vm.model.PiObj.rbtnmail = 1;
             //  var expirydate = '08/25/2017';
             //  debugger;
             //  if (expirydate > moment().format('MM/DD/YYYY')) {

             //  } else if (expirydate < moment().format('MM/DD/YYYY')) {

             //  } else if (expirydate === moment().format('MM/DD/YYYY')) {

             //  }
         };
         vm.Number = Number;
         vm.init();

     }
 })();