 (function(angular) {
     'use strict';

     function controller(editSibblingModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editSibblingModel.init();
             vm.model.scope = scope;
         };

         vm.init();

     }
     angular
         .module('Kaakateeya')
         .controller('editSibblingCtrl', controller);

     controller.$inject = ['editSibblingModel', '$scope', '$window'];
 })(angular);