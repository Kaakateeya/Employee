 (function(angular) {
     'use strict';



     function controller(model, scope, dashboardServices) {
         scope.arrays = [];
         scope.exportData = function() {
             alasql('SELECT * INTO XLSX("john.xlsx",{headers:true}) FROM ?', [scope.arrays]);
         };

         /* jshint validthis:true */
         var vm = this;
         scope.arrays = [];
         scope.tabledata = function(empid, branchcode, frompage, topage, tablename, type) {
             dashboardServices.getlandingdata(empid, branchcode, frompage, topage, tablename).then(function(response) {
                 _.each(response.data, function(item) {
                     var testArr = JSON.parse(item);
                     if (testArr.length > 0 && testArr[0].TableName !== undefined) {
                         scope.arrays.push({ TableName: testArr[0].TableName, value: testArr });
                         if (type === "export") {
                             scope.exportData();
                         }
                     }
                 });
             });
         }

         scope.init = function() {
             scope.arrays = [];
             scope.tabledata(2, 319, 1, 10, '', 'load');
             // scope.$destroy=
         };

         scope.loadmore = function(empid, branchcode, frompage, topage, tablename, type) {
             switch (type) {
                 case "export":
                     scope.tabledata(empid, branchcode, frompage, topage, tablename, type);
                     break;
                 case "load":
                     scope.tabledata(empid, branchcode, frompage, topage, tablename, type);
                     break;
             }

         };
     }
     angular.module('Kaakateeya').controller('dashboardCtrl', ['dashboardModel', '$scope', 'dashboardServices', controller]);

 })(angular);