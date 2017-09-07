 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('viewUploadSettledProfilesCtrl', controller);
     controller.$inject = ['viewUploadSettledProfilesModel', '$scope', 'authSvc'];

     function controller(viewUploadSettledProfilesModel, scope, authSvc) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = viewUploadSettledProfilesModel;
             vm.model.typeOfReference = '';
             vm.model.txtProfileID = '';
             vm.model.rdnSignIn = '';
             vm.model.scope = scope;
             model.settlementimage = "";
             model.viewsettlementprofileid = '';
             model.showHidediv = false;
             model.settlementimageID = '';
             model.Managementid = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
             model.Admin = authSvc.isAdmin();
             model.isDisabledsubmit = false;
         };
         vm.init();
     }
 })();