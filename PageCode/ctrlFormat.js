 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('parametervalueCtrl', controller)

     controller.$inject = ['parametervalueModel'];

     function controller(parametervalueModel) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = parametervalueModel();
         };

         vm.init();

     }
 })();