 (function(angular) {
     'use strict';

     function controller(editPropertyModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editPropertyModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('editPropertyCtrl', controller);

     controller.$inject = ['editPropertyModel', '$scope', '$window'];
 })(angular);