 (function(angular) {
     'use strict';
     angular.module('Kaakateeya').controller('dashboardCtrl', ['dashboardModel', '$scope', 'dashboardServices', 'modelpopupopenmethod', 'alert', 'authSvc', function(dashboardModel, scope, dashboardServices, commonpage, alerts, authSvc) {
         var vm = this,
             model;
         vm.init = function() {
             if (authSvc.LoginEmpid() !== dashboardModel.empid) {
                 vm.model = model = dashboardModel.init();
             } else {
                 vm.model = model = dashboardModel;
             }
             model.scope = scope;
             model.templateUrl = "templates/dashBoardslide.html";
             model.config.headettemp = "dashboardheader.html";
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