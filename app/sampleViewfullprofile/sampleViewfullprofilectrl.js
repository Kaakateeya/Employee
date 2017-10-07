 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('sampleViewfullprofileCtrl', controller);

     controller.$inject = ['sampleViewfullprofileModel'];

     function controller(sampleViewfullprofileModel) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = sampleViewfullprofileModel;
         };

         vm.init();

     }
 })();