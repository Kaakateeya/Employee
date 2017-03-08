 (function(angular) {
     'use strict';

     function controller(scope) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {

         };
         vm.init();
     }

     angular
         .module('Kaakateeya')
         .controller('searchpageCtrl', ['$scope', controller]);
 })(angular);