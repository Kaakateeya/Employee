 (function(angular) {
     'use strict';

     function controller(editSpouseModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editSpouseModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('editSpouseCtrl', controller);

     controller.$inject = ['editSpouseModel', '$scope', '$window'];
 })(angular);