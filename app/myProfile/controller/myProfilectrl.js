 (function() {
     'use strict';

     function controller(myProfileModel, scope) {
         var vm = this;
         vm.init = function() {
             vm.model = myProfileModel;
             myProfileModel.MyProfilePageLoad();
             vm.model.mpObj.rdnprofileType = '';
             vm.model.mpObj.rdnGender = '';
             vm.model.mpObj.rdnWebsiteLogin = '';
             vm.model.mpObj.rdncontactsVerified = '';
             vm.model.mpObj.rdnWebsiteBlocked = '';

             vm.model.mpObj.ddlApplicationStatus = [54];
             vm.model.mpObj.ddlCaste = [402];
             vm.model.opendiv = true;
             vm.model.scope = scope;
         };
         vm.click = function() {
             alert(1111);
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('myProfileCtrl', controller)
     controller.$inject = ['myProfileModel', '$scope'];
 })(angular);