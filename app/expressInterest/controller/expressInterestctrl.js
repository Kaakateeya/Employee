 (function() {
     'use strict';

     function controller(expressInterestModel, scope, $rootScope) {
         var vm = this;

         vm.init = function() {
             vm.model = expressInterestModel;
             vm.model.scope = scope;
             vm.model.exiObj = {};
             vm.model.exiObj.rbtnSendSms = 1;
             vm.model.exiObj.rbtnBasic = 358;
             vm.model.exiObj.rbtnTypeofService = 366;
             vm.model.disableinput = false;
             vm.model.SelectProfilelst = [];
             vm.model.exiObj.txtFromprofileID = '';
             vm.model.exiObj.chkrvrsend = true;
         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('expressInterestCtrl', controller);
     controller.$inject = ['expressInterestModel', '$scope', '$rootScope'];
 })(angular);