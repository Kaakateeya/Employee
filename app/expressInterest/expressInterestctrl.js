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
             vm.model.exiObj.ModeofService = 353;
             model.scope = scope;
             model.mismatchflag = 0;
             model.showHide = 0;
             model.emailselectedArr = [];
             model.isDisabledsubmit = false;
         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('expressInterestCtrl', controller);
     controller.$inject = ['expressInterestModel', '$scope', '$rootScope'];
 })(angular);