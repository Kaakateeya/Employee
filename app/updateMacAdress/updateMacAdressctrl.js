 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('updateMacAdressCtrl', controller);

     controller.$inject = ['updateMacAdressModel', '$scope', 'authSvc'];

     function controller(updateMacAdressModel, scope, authSvc) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = updateMacAdressModel;
             vm.model.region = '';
             vm.model.scope = scope;
             vm.model.Admin = authSvc.isAdmin();
         };

         vm.init();
     }
 })();