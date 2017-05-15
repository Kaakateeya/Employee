 (function(angular) {
     'use strict';

     function controller(editOfcePurposeModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editOfcePurposeModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('editOfcePurposeCtrl', controller);

     controller.$inject = ['editOfcePurposeModel', '$scope', '$window'];
 })(angular);