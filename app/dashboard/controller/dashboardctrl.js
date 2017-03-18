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
             model.init();
         };
         vm.init();

         vm.slideshowfunction = function(flag, empid, branchcode, frompage, topage, tablename, type, array, slideflag) {
             //model.slideshowfunction(flag, empid, branchcode, frompage, topage, tablename, type, array, slideflag);
             //call http method here after then function call the broadcast method
             dashboardServices.getlandingdata(empid, branchcode, frompage, topage, tablename, slideflag).then(function(response) {
                 if (response !== undefined && response !== null && response !== "" && response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0 && response.data[0].length > 0) {
                     if (frompage === 1) {
                         model.slidearray = response.data[0];
                     } else {
                         _.each(response.data, function(inneritem) {
                             model.slidearray.push(inneritem);
                         });
                     }
                     scope.$broadcast("slideshowdynamic", model.slidearray, model.slidearray[0].TotalRows, tablename, frompage);
                 }
                 console.log(model.slidearray);
             });
         };


         scope.$on("slideshowsubmit", function(event, frompage, topage, tablename) {
             vm.slideshowfunction(true, model.empid, model.empBranchID, frompage, topage, tablename, 'slideshow', model.slidearray, 1);
         });
         vm.arrayslice = function(index) {
             model.landingItems.splice(index, 1);
             return false;
         };
     }
     angular.module('Kaakateeya').controller('dashboardCtrl', ['dashboardModel', '$scope', 'dashboardServices', 'commonpagecc', Controller]);

 })(angular);