 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('unassignedHoroscopeCtrl', controller)

     controller.$inject = ['unassignedHoroscopeModel'];

     function controller(unassignedHoroscopeModel) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = unassignedHoroscopeModel;
         };

         vm.init();

     }
 })();