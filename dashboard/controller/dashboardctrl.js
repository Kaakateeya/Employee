 (function(angular) {
     'use strict';



     function controller(model, scope, dashboardServices) {
         scope.arrays = [];
         scope.slideshowArray = [];
         scope.exportData = function(id) {
             var blob = new Blob([document.getElementById(id).innerHTML], {
                 type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
             });
             saveAs(blob, "Report.xls");
         };
         scope.slideshowtrue = false;
         /* jshint validthis:true */
         var vm = this;
         scope.arrays = [];
         scope.arrayoffline = [];
         scope.arrayofflineexpired = [];
         scope.arrayunpaid = [];
         scope.arrayinactivecustomers = [];
         scope.arraytodayremainder = [];
         scope.arraynotviewed = [];
         scope.arrayupdates = [];
         scope.arrayProceeding = [];
         scope.arrayshide = true;
         scope.arrayofflinehide = true;
         scope.arrayofflineexpiredhide = true;
         scope.arrayunpaidhide = true;
         scope.arrayinactivecustomershide = true;
         scope.arraytodayremainderhide = true;
         scope.arraynotviewedhide = true;
         scope.arrayupdateshide = true;
         scope.arrayProceedinghide = true;
         scope.tabledata = function(empid, branchcode, frompage, topage, tablename, type) {
             dashboardServices.getlandingdata(empid, branchcode, frompage, topage, tablename).then(function(response) {
                 _.each(response.data, function(item) {
                     var testArr = JSON.parse(item);
                     console.log(testArr);
                     if (testArr.length > 0 && testArr[0].TableName !== undefined) {
                         // scope.arrays.push({ TableName: testArr[0].TableName, value: testArr });
                         if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "No-Service From Last 1 Month") {
                             scope.arrays = testArr;
                             scope.arrayshide = false;
                             if (type === "export") {
                                 scope.exportData('exportablenoservice');
                             }
                         } else if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "Near by offline Expiry") {
                             scope.arrayoffline = testArr;
                             cope.arrayofflinehide = false;
                             if (type === "export") {
                                 scope.exportData('exportableoffline');
                             }
                         } else if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "Offline Expired Customers") {
                             scope.arrayofflineexpired = testArr;
                             scope.arrayofflineexpiredhide = false;
                             if (type === "export") {
                                 scope.exportData('exportableofflineexpired');
                             }
                         } else if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "Un-Paid Customers") {
                             scope.arrayunpaid = testArr;
                             scope.arrayunpaidhide = false;
                             if (type === "export") {
                                 scope.exportData('exportableunpaid');
                             }
                         } else if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "Inactive Customers") {
                             scope.arrayinactivecustomers = testArr;
                             scope.arrayinactivecustomershide = false;
                             if (type === "export") {
                                 scope.exportData('exportableinactive');
                             }
                         } else if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "Today Remainders") {
                             scope.arraytodayremainder = testArr;
                             scope.arraytodayremainderhide = false;
                             if (type === "export") {
                                 scope.exportData("exportableremainder");
                             }
                         } else if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "Not-Viewed Services") {
                             scope.arraynotviewed = testArr;

                             scope.arraynotviewedhide = false;

                             if (type === "export") {
                                 scope.exportData('exportablenotview');
                             }
                         } else if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "No Updates on MFT") {
                             scope.arrayupdates = testArr;
                             scope.arrayupdateshide = false;

                             if (type === "export") {
                                 scope.exportData('exportableupdatehide');
                             }
                         } else if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "Yesterday Proceeding Profiles") {
                             scope.arrayProceeding = testArr;
                             scope.arrayProceedinghide = false;
                             if (type === "export") {
                                 scope.exportData('exportableproceeding');
                             }
                         }
                     }
                 });
             });
         };

         scope.init = function() {
             scope.arrays = [];
             scope.arrayoffline = [];
             scope.arrayofflineexpired = [];
             scope.arrayunpaid = [];
             scope.arrayinactivecustomers = [];
             scope.arraytodayremainder = [];
             scope.arraynotviewed = [];
             scope.arrayupdates = [];
             scope.arrayProceeding = [];
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
         // 

     }
     angular.module('Kaakateeya').controller('dashboardCtrl', ['dashboardModel', '$scope', 'dashboardServices', controller]);

 })(angular);