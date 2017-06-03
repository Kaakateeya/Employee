 (function(angular) {
     'use strict';

     function Controller(dashboardModel, scope, dashboardServices, commonpage, alerts, authSvc) {
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
             vm.model = model = dashboardModel();
             model.scope = scope;
             model.proceedprofileid = null;
             model.entryid = null;
             model.emailbounce = null;
             model.uploadfromsubmit = false;
             model.Custidbounce = null;
             model.landingItems = [];
             model.norecordstable = false;
             model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
             model.empBranchID = authSvc.empBranchID() !== undefined && authSvc.empBranchID() !== null && authSvc.empBranchID() !== "" ? authSvc.empBranchID() : "";
             model.init();
         };
         vm.init();

         scope.$on("slideshowsubmit", function(event, frompage, topage, tablename) {
             vm.slideshowfunction(true, model.empid, model.empBranchID, frompage, topage, tablename, 'slideshow', model.slidearray, 1);
         });
         vm.arrayslice = function(index) {
             model.landingItems.splice(index, 1);
             return false;
         };
         scope.$on("saformuploadsubmit", function(event, profileid) {
             model.proceedprofileid = profileid;
             model.uploadfromsubmit = false;
             commonpage.showPopupphotopoup('uploadsaform.html', model.scope, 'sm', "modalclassdashboardphotopopup");
         });
         scope.$on("updatebouncedemailmethod", function(event, entryid, emailbounce, Custid) {
             model.entryid = entryid;
             model.emailbounce = emailbounce;
             model.Custidbounce = Custid;
             model.uploadfromsubmit = true;
             commonpage.showPopupphotopoup('uploadsaform.html', model.scope, 'sm', "modalclassdashboardphotopopup");
         });

         vm.uploadsaformtable = function(profileid) {
             model.proceedprofileid = profileid;
             commonpage.showPopupphotopoup('uploadsaform.html', model.scope, 'sm', "modalclassdashboardphotopopup");
         };

         scope.$on("photorequest", function(event, profileid) {
             dashboardServices.PhotoRequest(profileid, model.empid).then(function(response) {
                 if (response !== undefined && response !== null && response !== "" && response.data !== undefined) {
                     if (response.data === 1) {
                         alerts.timeoutoldalerts(model.scope, 'alert-success', 'PhotoRequest send successfully', 4000);
                     } else {
                         alerts.timeoutoldalerts(model.scope, 'alert-danger', 'PhotoRequest send Failed', 4000);
                     }
                 }
             });
         });

         scope.$on("notificationread", function(event, Cust_NotificationID, index, parentindex, Custid, CategoryID) {
             model.notificationread(Cust_NotificationID, index, parentindex, Custid, CategoryID);
         });

         scope.$on("ticketupdate", function(event, ticketid) {
             model.tickethistorypopup(ticketid);
         });
     }
     angular.module('Kaakateeya').controller('dashboardCtrl', ['dashboardModel', '$scope', 'dashboardServices', 'modelpopupopenmethod', 'alert', 'authSvc', Controller]);

 })(angular);