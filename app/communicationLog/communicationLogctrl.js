 (function(angular) {
     'use strict';

     function controller($location, communicationLogModel, scope, authSvc) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = communicationLogModel();
             model.scope = scope;
             model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
             // model.communicationlogsubmit(model.Profileidcommunication);
             model.searchObjectquery = $location.search();
             var meKey = Object.getOwnPropertyNames(model.searchObjectquery)[0];
             model.Profileidcommunication = model.searchObjectquery[meKey];
             if (model.Profileidcommunication !== "" && model.Profileidcommunication !== null && model.Profileidcommunication !== undefined && model.Profileidcommunication !== "undefined") {
                 model.communicationlogsubmit(model.Profileidcommunication);
             }
         };
         vm.init();
     }

     angular
         .module('Kaakateeya')
         .controller('communicationLogCtrl', controller);
     controller.$inject = ['$location', 'communicationLogModel', '$scope', 'authSvc'];
 })(angular);