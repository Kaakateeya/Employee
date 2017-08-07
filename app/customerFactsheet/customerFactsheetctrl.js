 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('customerFactsheetCtrl', ['customerFactsheetModel', '$scope', function(customerFactsheetModel, scope) {
             /* jshint validthis:true */
             var vm = this,
                 model;
             vm.init = function() {
                 vm.model = model = customerFactsheetModel;
                 model.scope = scope;
                 model.panelbodyhide = true;
             };
             vm.init();
         }]);
 })();