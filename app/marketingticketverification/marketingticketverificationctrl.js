 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('marketingticketverificationCtrl', ['marketingticketverificationModel', function(marketingticketverificationModel) {
             /* jshint validthis:true */
             var vm = this,
                 model;

             vm.init = function() {
                 vm.model = model = marketingticketverificationModel;
             };

             vm.init();

         }]);


 })();