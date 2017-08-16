 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('fixedtableTestingCtrl', controller)

     controller.$inject = ['fixedtableTestingModel', '$scope'];

     function controller(fixedtableTestingModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = fixedtableTestingModel;
             model.scope = scope;
             model.visibleProjects = model.modelarray;
             //  model.comparator = Comparators.year;
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