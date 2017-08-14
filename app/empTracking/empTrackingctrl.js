 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('empTrackingCtrl', controller);

     controller.$inject = ['empTrackingModel', '$scope'];

     function controller(empTrackingModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = empTrackingModel;
             model.opendiv = true;
             model.scope = scope;
             model.empNames = '';
             model.wrkngHrs = '';
             model.fromdate = '';
             model.toDate = '';
             model.excelVal = 1;
             model.branch = ["319", "320", "321", "322", "323", "324", "325", "326", "328", "329", "330", "331", "332", "333", "334", "335", "336", "337", "338", "339", "340", "341", "342", "343", "344"];
         };

         vm.init();

     }
 })();