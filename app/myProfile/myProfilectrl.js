 (function() {
     'use strict';


     angular
         .module('Kaakateeya')
         .controller('myProfileCtrl', ['myProfileModel', '$scope', '$location', 'authSvc', function(myProfileModel, scope, $location, authSvc) {
             var vm = this,
                 model;
             vm.init = function() {
                 vm.model = model = myProfileModel;
                 model.gridArray = [];
                 model.empid = model.slide.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";

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
                 model.slide.templateUrl = "templates/myprofileSlide.html";
                 model.slide.config.headettemp = "templates/myprofileheader.html";
                 scope.$on("$destroy", vm.destroy);
             };
             vm.destroy = function() {
                 model.destroy();
             };

             vm.init();
         }]);
 })(angular);