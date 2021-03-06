 (function(angular) {
     'use strict';

     function controller(editParentModel, scope, window, baseModel, $rootScope) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = model = editParentModel.init();
             vm.model.scope = scope;
         };

         //  $rootScope.$watch('ProfileOwner', function(newval, old) {
         //      model.isprofileOwner = newval ? parseInt(newval) === parseInt(model.empid) : false;
         //  });

         $rootScope.$watchGroup(['ProfileOwner', 'EditProfilePaidStatus'], function(newval, old) {
             if (newval)
                 vm.model.isprofileOwner = (newval[0] ? (parseInt(newval[0]) === parseInt(vm.model.empid)) : false) || (newval[1] !== undefined && newval[1] !== null ? parseInt(newval[1]) !== 1 : false);
         });

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('editParentCtrl', controller);

     controller.$inject = ['editParentModel', '$scope', '$window', 'baseModel', '$rootScope'];
 })(angular);