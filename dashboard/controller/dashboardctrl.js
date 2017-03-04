 (function(angular) {
     'use strict';

     function Controller(dashboardModel, scope) {
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = dashboardModel;
             model.slideshowfunction(false);
         };

         vm.init();
     }
     angular.module('Kaakateeya').controller('dashboardCtrl', ['dashboardModel', '$scope', Controller]);

 })(angular);