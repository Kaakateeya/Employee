 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('ReportsofEmployeesCtrl', controller);

     controller.$inject = ['ReportsofEmployeesModel', '$scope'];

     function controller(ReportsofEmployeesModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = ReportsofEmployeesModel;
             model.scope = scope;
             model.opendiv = false;
             model.visibleProjects = model.modelarray;
             model.facilities = [];
             for (var i = 0; i < model.visibleProjects.length; i++) {
                 model.facilities.push(model.visibleProjects[i].facility);
             }
             scope.$watch('selected', function(fac) {
                 scope.$broadcast("rowSelected", fac);
             });
         };

         vm.init();

     }
 })();