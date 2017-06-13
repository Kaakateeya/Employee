 (function(angular) {
     'use strict';

     function controller(basicRegistrationModel, scope) {
         var vm = this,
             model;
         vm.init = function() {
             model = {};
             vm.model = model = basicRegistrationModel;
             vm.model.scope = scope;
             model.reg.Chkfree_reg = true;
             scope.$on("$destroy", vm.destroy);
             // write destroy method 
         };
         vm.destroy = function() {
             model.casteArr = [];
             model.reg = {};
             model.reg.Chkprivacy = true;
             model.reg.Chkfree_reg = true;
             scope.regForm.$setPristine();
             scope.regForm.$setUntouched();
         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('basicRegistrationCtrl', controller);

     controller.$inject = ['basicRegistrationModel', '$scope'];
 })(angular);