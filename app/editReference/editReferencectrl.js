 (function(angular) {
     'use strict';

     function controller(editReferenceModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editReferenceModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('editReferenceCtrl', controller);

     controller.$inject = ['editReferenceModel', '$scope', '$window'];
 })(angular);