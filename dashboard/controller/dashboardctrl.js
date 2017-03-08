 (function(angular) {
     'use strict';

     function Controller(dashboardModel, scope, dashboardServices, commonpage) {
         var vm = this,
             model;
         var currentIndex = 1;
         var currentslide = 1;
         vm.ShowPause = true;
         vm.carousalID = 'myCarousel';
         vm.slidNum = 1;
         vm.slidNumfiled = 1;
         vm.prevhide = false;
         vm.init = function() {
             vm.model = model = dashboardModel;
             model.slideshowfunction(false);

             if (model.empid !== "") {
                 model.tabledata(model.empid, model.empBranchID, 1, 5, '', 'pageload', undefined, 0);
             }
         };

         vm.init();

         ///////////
         vm.slideshowfunction = function(flag, empid, branchcode, frompage, topage, tablename, type, array, slideflag) {
             //model.slideshowfunction(flag, empid, branchcode, frompage, topage, tablename, type, array, slideflag);
             //call http method here after then function call the broadcast method
             dashboardServices.getlandingdata(empid, branchcode, frompage, topage, tablename, slideflag).then(function(response) {
                 if (frompage === 1) {
                     model.slidearray = response.data[0];
                 } else {
                     _.each(response.data, function(inneritem) {
                         model.slidearray.push(inneritem);
                     });
                 }
                 console.log(model.slidearray);
                 scope.$broadcast("slideshowdynamic", model.slidearray, model.slidearray[0].TotalRows);
             });
         };

     }
     angular.module('Kaakateeya').controller('dashboardCtrl', ['dashboardModel', '$scope', 'dashboardServices', 'commonpage', Controller]);

 })(angular);