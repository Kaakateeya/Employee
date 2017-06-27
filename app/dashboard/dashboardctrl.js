 (function(angular) {
     'use strict';
     angular.module('Kaakateeya').controller('dashboardCtrl', ['dashboardModel', '$scope', 'dashboardServices', 'modelpopupopenmethod', 'alert', 'authSvc', function(dashboardModel, scope, dashboardServices, commonpage, alerts, authSvc) {
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = dashboardModel;
             model.scope = scope;
             scope.$on("$destroy", vm.destroy);
         };
         vm.destroy = function() {
             model.destroy();
         };
         vm.init();
         vm.arrayslice = function(index) {
             model.landingItems.splice(index, 1);
             return false;
         };
     }]);
 })(angular);