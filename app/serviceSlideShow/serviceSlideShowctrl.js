 (function() {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('serviceSlideShowCtrl', ['$location', '$scope', 'serviceSlideShowModel', 'authSvc', function($location, scope, serviceSlideShowModel, authSvc) {
             /* jshint validthis:true */
             var vm = this,
                 model;
             vm.init = function() {
                 vm.model = model = serviceSlideShowModel;
                 model.scope = scope;
                 model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                 model.isAdmin = authSvc.isAdmin() !== undefined && authSvc.isAdmin() !== null && authSvc.isAdmin() !== "" ? authSvc.isAdmin() : "";
                 model.viewsettlementprofileid = "";
                 model.typeofbind = 0;
                 model.serviceslideshowarray = [];
                 model.servicepersonalarray = [];
                 model.templateUrl = "templates/serviceSlideshowSlide.html";
                 model.headettemp = "seviceslideshowheader.html";
                 model.typeofbind = 0;
                 model.fromIntetestflag = null;
                 model.toIntetestflag = null;
                 model.datapersonal = false;
                 model.showcontrolsdiv = true;
             };
             vm.init();
         }]);
 })();