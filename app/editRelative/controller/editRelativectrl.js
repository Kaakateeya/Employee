 (function(angular) {
     'use strict';

     function controller(editRelativeModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editRelativeModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('editRelativeCtrl', controller);

     controller.$inject = ['editRelativeModel', '$scope', '$window'];
 })(angular);