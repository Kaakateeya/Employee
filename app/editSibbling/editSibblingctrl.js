 (function(angular) {
     'use strict';

     function controller(editSibblingModel, scope, window, $rootScope) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editSibblingModel.init();
             vm.model.scope = scope;
         };
         $rootScope.$watch('ProfileOwner', function(newval, old) {
             model.isprofileOwner = newval ? parseInt(newval) === parseInt(model.empid) : false;
         });
         vm.init();

     }
     angular
         .module('Kaakateeya')
         .controller('editSibblingCtrl', controller);

     controller.$inject = ['editSibblingModel', '$scope', '$window', '$rootScope'];
 })(angular);