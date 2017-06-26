 (function() {
     'use strict';


     angular
         .module('Kaakateeya')
         .controller('myProfileCtrl', ['myProfileModel', '$scope', '$location', function(myProfileModel, scope, $location) {
             var vm = this,
                 model;
             vm.init = function() {
                 vm.model = model = myProfileModel;
                 // model.MyProfilePageLoad();
                 model.gridArray = [];
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
                     // model.MyprofileResult(model.mpObj, 1, 10, 'grid', 1);
                 }
             };

             vm.init();
         }]);
 })(angular);