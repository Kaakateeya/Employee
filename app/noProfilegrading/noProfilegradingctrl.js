 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('noProfilegradingCtrl', controller);

     controller.$inject = ['noProfilegradingModel'];

     function controller(noProfilegradingModel) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = noProfilegradingModel;
             model.panelbodyhide = true;
             model.reset();
         };

         vm.init();

     }
 })();