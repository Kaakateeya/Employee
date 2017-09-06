 (function() {
     'use strict';

     function controller(expressInterestModel, scope, $rootScope) {
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = expressInterestModel;
             vm.model.exiObj = {};
             vm.model.exiObj.rbtnSendSms = 1;
             vm.model.exiObj.rbtnBasic = 358;
             vm.model.exiObj.rbtnTypeofService = 366;
             vm.model.disableinput = false;
             vm.model.SelectProfilelst = [];
             vm.model.exiObj.txtFromprofileID = '';
             vm.model.exiObj.chkrvrsend = true;
             model.scope = scope;
             model.mismatchflag = 0;
             model.isDisabledsubmit = false;
         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('expressInterestCtrl', controller);
     controller.$inject = ['expressInterestModel', '$scope', '$rootScope'];
 })(angular);