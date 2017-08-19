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
             model.visibleProjects1 = model.modelarray2;
             scope.$watch('selected', function(fac) {
                 scope.$broadcast("rowSelected", fac);
             });
         };

         vm.init();

     }
 })();