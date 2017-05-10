 (function() {
     'use strict';

     function controller(myProfileModel, scope, $location) {
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
             vm.model.grid.showplus = false;
             debugger;
             vm.model.searchObjectquery = $location.search();
             var meKey = Object.getOwnPropertyNames(vm.model.searchObjectquery)[0];
             vm.model.myprofileid = vm.model.searchObjectquery[meKey];
             if (vm.model.myprofileid !== "" && vm.model.myprofileid !== null && vm.model.myprofileid !== undefined && vm.model.myprofileid !== "undefined") {
                 debugger;
                 vm.model.mpObj.txtProfileID = vm.model.myprofileid;
                 // vm.model.MyprofileResult(vm.model.mpObj, 1, 10, 'grid', 1);
             }

         };
         vm.click = function() {
             alert(1111);
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('myProfileCtrl', controller);
     controller.$inject = ['myProfileModel', '$scope', '$location'];
 })(angular);