 (function(angular) {
     'use strict';



     function controller(model, scope) {
         /* jshint validthis:true */
         var vm = this;


         vm.init = function() {
             vm.model = model;
             // scope.$destroy=
         };
         vm.init();

         function activate() {
             vm.name = 'hi';

         }

     }
     angular.module('Kaakateeya').controller('dashboardCtrl', ['dashboardModel', '$scope', controller]);

 })(angular);