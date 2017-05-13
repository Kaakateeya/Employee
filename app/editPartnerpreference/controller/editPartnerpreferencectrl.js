 (function(angular) {
     'use strict';

     function controller(editPartnerpreferenceModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editPartnerpreferenceModel.init();
             vm.model.scope = scope;
         };

         vm.init();

     }
     angular
         .module('Kaakateeya')
         .controller('editPartnerpreferenceCtrl', controller);

     controller.$inject = ['editPartnerpreferenceModel', '$scope', '$window'];
 })(angular);