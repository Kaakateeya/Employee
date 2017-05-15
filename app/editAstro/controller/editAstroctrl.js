 (function(angular) {
     'use strict';

     function controller(editAstroModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.scope = scope;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editAstroModel;
             editAstroModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('editAstroCtrl', controller);

     controller.$inject = ['editAstroModel', '$scope', '$window'];
 })(angular);