 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('brokerProfileRegistrationCtrl', controller);

     controller.$inject = ['brokerProfileRegistrationModel', '$scope'];

     function controller(brokerProfileRegistrationModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = brokerProfileRegistrationModel;
             vm.model.scope = scope;
             vm.model.mediaterID = '';
             model.isdisabled = false;
             scope.$on("$destroy", vm.destroy);
         };
         vm.destroy = function() {
             model.casteArr = [];
             model.reg = {};
             model.reg.Chkprivacy = true;
             scope.regForm.$setPristine();
             scope.regForm.$setUntouched();
         };
         vm.init();

     }
 })();