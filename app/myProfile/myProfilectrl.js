 (function() {
     'use strict';


     angular
         .module('Kaakateeya')
         .controller('myProfileCtrl', ['myProfileModel', '$scope', '$location', 'authSvc', '$timeout',

             function(myProfileModel, scope, $location, authSvc, timeout) {
                 var vm = this,
                     model;
                 vm.pageload = function() {
                     model.mpObj = {};
                     model.empid = model.slide.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                     model.isAdmin = authSvc.isAdmin() !== undefined && authSvc.isAdmin() !== null && authSvc.isAdmin() !== "" ? authSvc.isAdmin() : "";
                     model.mpObj.ddlProfileOwner = [parseInt(model.empid)];
                     model.mpObj.rdnprofileType = '';
                     model.mpObj.rdnGender = '';
                     model.mpObj.rdnWebsiteLogin = '';
                     model.mpObj.rdncontactsVerified = '';
                     model.mpObj.rdnWebsiteBlocked = '';
                     model.mpObj.ddlApplicationStatus = [54];
                     model.mpObj.ddlCaste = [402];
                     model.mpObj.rdndocmacile = "";
                     model.opendiv = true;
                     model.scope = scope;
                     model.grid.showplus = false;
                     model.searchObjectquery = $location.search();
                     var meKey = Object.getOwnPropertyNames(model.searchObjectquery)[0];
                     model.myprofileid = model.searchObjectquery[meKey];
                     if (model.myprofileid !== "" && model.myprofileid !== null && model.myprofileid !== undefined && model.myprofileid !== "undefined") {
                         model.mpObj.txtProfileID = model.myprofileid;
                     }
                     model.isDisabledsubmit = false;
                 };
                 vm.init = function() {
                     vm.model = model = myProfileModel;
                     model.gridArray = [];
                     model.slidedata = [];
                     if (!model.applicationStatusarray) {
                         vm.pageload();
                         model.slide.templateUrl = "templates/myprofileSlide.html";
                         model.slide.config.headettemp = "templates/myprofileheader.html";
                     } else {
                         model.copyOfapplicationStatusarray = angular.copy(model.applicationStatusarray);
                         model.copyOfBrancharray = angular.copy(model.Brancharray);
                         model.copyOfProfileOwnerarray = angular.copy(model.ProfileOwnerarray);
                         model.copyOfmaritalstatusarray = angular.copy(model.maritalstatusarray);
                         model.copyOfCastearray = angular.copy(model.Castearray);
                         model.applicationStatusarray = [];
                         model.Brancharray = [];
                         model.ProfileOwnerarray = [];
                         model.maritalstatusarray = [];
                         model.Castearray = [];
                         timeout(function() {
                             model.applicationStatusarray = model.copyOfapplicationStatusarray;
                             model.Brancharray = model.copyOfBrancharray;
                             model.ProfileOwnerarray = model.copyOfProfileOwnerarray;
                             model.maritalstatusarray = model.copyOfmaritalstatusarray;
                             model.Castearray = model.copyOfCastearray;
                             vm.pageload();
                         }, 500);

                         //clear dom array in model
                         //time out will call dom array back
                     }
                     model.slide.templateUrl = "templates/myprofileSlide.html";
                     model.slide.config.headettemp = "templates/myprofileheader.html";
                     model.myprofileslideshowopenflag = 0;
                     scope.$on("$destroy", vm.destroy);
                 };
                 vm.destroy = function() {
                     model.destroy();
                 };
                 vm.init();
             }
         ]);
 })(angular);