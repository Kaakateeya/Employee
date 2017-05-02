 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('mailViewFullProfileCtrl', controller)

     controller.$inject = ['mailViewFullProfileModel', '$scope', '$location'];

     function controller(mailViewFullProfileModel, scope, $location) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = mailViewFullProfileModel;
             vm.model.scope = scope;
             //  scope.searchObjectquery = $location.search();
             //  var meKey = Object.getOwnPropertyNames(scope.searchObjectquery)[0];
             //  var meValue = scope.searchObjectquery[meKey];
             //  scope.MyProfileQSAccept = "?" + (meKey).toString() + "=" + (meValue).toString();
             //  model.EmpViewfullProfile((scope.MyProfileQSAccept).replace(' ', '+'));
         };

         vm.init();
     }
 })();