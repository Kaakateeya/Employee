 (function(angular) {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('communicationLogCtrl', ['$location', 'communicationLogModel', '$scope', 'authSvc', '$http', function($location, communicationLogModel, scope, authSvc, $http) {
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
                 model.Nameofcandidate = "";
                 model.sendarray = [];
                 model.sendarray2 = [];
                 model.sendarray3 = [];
                 model.sendarray4 = [];
                 if (model.Profileidcommunication !== "" && model.Profileidcommunication !== null && model.Profileidcommunication !== undefined && model.Profileidcommunication !== "undefined") {
                     model.communicationlogsubmit(model.Profileidcommunication);
                 }
                 //  $http({
                 //      url: '/downloadimage',
                 //      data: { imagename: '011000002_1.jpg' },
                 //      method: "POST",
                 //      responseType: 'blob'
                 //  }).success(function(data, status, headers, config) {
                 //      var blob = new Blob([data], { type: 'image/jpeg' });
                 //      var fileName = 'profileid' + 1; //headers('content-disposition');
                 //      saveAs(blob, fileName);
                 //  }).error(function(data, status, headers, config) {
                 //      console.log('Unable to download the file');
                 //  });
             };
             vm.init();
         }]);
 })(angular);