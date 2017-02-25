 (function(angular) {
     'use strict';



     function controller() {
         /* jshint validthis:true */
         var vm = this;

         activate();

         function activate() {
             vm.name = 'hi';
         }
     }
     angular.module('Kaakateeya').controller('dashboardCtrl', controller)

 })(angular);