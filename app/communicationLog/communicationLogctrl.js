 (function(angular) {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('communicationLogCtrl', ['$location', 'communicationLogModel', '$scope', 'authSvc', function($location, communicationLogModel, scope, authSvc) {
             /* jshint validthis:true */
             var vm = this,
                 model;
             vm.init = function() {
                 vm.model = model = communicationLogModel;
                 model.scope = scope;
                 model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                 model.searchObjectquery = $location.search();
                 var meKey = Object.getOwnPropertyNames(model.searchObjectquery)[0];
                 model.Profileidcommunication = model.searchObjectquery[meKey];
                 model.Profileidcommunication = '311134610';
                 model.Nameofcandidate = "";
                 model.sendarray = [];
                 model.sendarray2 = [];
                 model.sendarray3 = [];
                 model.sendarray4 = [];
                 if (model.Profileidcommunication !== "" && model.Profileidcommunication !== null && model.Profileidcommunication !== undefined && model.Profileidcommunication !== "undefined") {
                     model.Profileidcommunication = '311134610';
                     model.communicationlogsubmit(model.Profileidcommunication);
                 }
                 model.isDisabledsubmit = false;
             };
             vm.init();
         }]);
 })(angular);