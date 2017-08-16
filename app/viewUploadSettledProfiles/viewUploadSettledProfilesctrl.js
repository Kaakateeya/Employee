 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('viewUploadSettledProfilesCtrl', controller)

     controller.$inject = ['viewUploadSettledProfilesModel', '$scope'];

     function controller(viewUploadSettledProfilesModel, scope) {
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
         };

         vm.init();

     }
 })();