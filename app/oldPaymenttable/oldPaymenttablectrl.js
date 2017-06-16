 (function() {
     'use strict';



     function controller(oldPaymenttableModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = oldPaymenttableModel;
             model.scope = scope;
         };

         vm.init();

     }
     angular
         .module('Kaakateeya')
         .controller('oldPaymenttableCtrl', controller);

     controller.$inject = ['oldPaymenttableModel', '$scope'];
 })();