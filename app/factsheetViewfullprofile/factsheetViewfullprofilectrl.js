 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('factsheetViewfullprofileCtrl', controller);

     controller.$inject = ['factsheetViewfullprofileModel'];

     function controller(factsheetViewfullprofileModel) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = factsheetViewfullprofileModel;
         };

         vm.init();

     }
 })();