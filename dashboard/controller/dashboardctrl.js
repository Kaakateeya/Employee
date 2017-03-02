 (function(angular) {
     'use strict';



     function controller(model, scope) {
         debugger;
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             vm.model = model.init();
             // scope.$destroy=
         };
         vm.init();
         //  vm.loadmore = function(empid, branchcode, frompage, topage, tablename) {
         //      debugger;
         //      vm.model = model.loadmore(empid, branchcode, frompage, topage, tablename);
         //      console.log(vm.model);
         //  };
     }
     angular.module('Kaakateeya').controller('dashboardCtrl', ['dashboardModel', '$scope', controller]);

 })(angular);