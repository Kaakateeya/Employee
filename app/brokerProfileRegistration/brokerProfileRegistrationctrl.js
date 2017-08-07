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
             vm.model = brokerProfileRegistrationModel;
             vm.model.scope = scope;
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