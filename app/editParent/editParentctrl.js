 (function(angular) {
     'use strict';

     function controller(editParentModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editParentModel.init();
             vm.model.scope = scope;
         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('editParentCtrl', controller);

     controller.$inject = ['editParentModel', '$scope', '$window'];
 })(angular);