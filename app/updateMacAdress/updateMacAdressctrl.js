 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('updateMacAdressCtrl', controller)

     controller.$inject = ['updateMacAdressModel'];

     function controller(updateMacAdressModel) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = updateMacAdressModel;
         };

         vm.init();

     }
 })();