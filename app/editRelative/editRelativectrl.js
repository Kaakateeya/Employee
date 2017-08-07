 (function(angular) {
     'use strict';

     function controller(editRelativeModel, scope, window, $rootScope) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editRelativeModel.init();
             vm.model.scope = scope;
         };

         $rootScope.$watchGroup(['ProfileOwner', 'EditProfilePaidStatus'], function(newval, old) {
             if (newval)
                 vm.model.isprofileOwner = (newval[0] ? (parseInt(newval[0]) === parseInt(vm.model.empid)) : false) || (newval[1] !== undefined && newval[1] !== null ? parseInt(newval[1]) !== 1 : false);
         });


         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('editRelativeCtrl', controller);

     controller.$inject = ['editRelativeModel', '$scope', '$window', '$rootScope'];
 })(angular);