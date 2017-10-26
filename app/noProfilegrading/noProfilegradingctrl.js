 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('noProfilegradingCtrl', controller);

     controller.$inject = ['noProfilegradingModel', '$scope'];

     function controller(noProfilegradingModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = noProfilegradingModel;
             model.panelbodyhide = true;
             model.reset();
             model.scope = scope;
         };

         vm.init();

     }
 })();