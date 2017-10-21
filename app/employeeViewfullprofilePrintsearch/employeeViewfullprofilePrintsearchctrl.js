 function controller(employeeViewfullprofileModel, scope, authSvc, $location, stateParams) {
     var vm = this,
         model;
     vm.init = function() {
         vm.model = model = employeeViewfullprofileModel;
         vm.model.scope = scope;
         vm.refForm = {};
         model.viewprofilearray = [];
         model.aboutmyself = {};
         model.personalinfo = {};
         model.basicinfo = [];
         model.forinbitinfo = {};
         model.nodatasisplay = {};
         model.selfProfileID = '';
         model.txtProfileID = '';
         model.fullprofileshow = true;
         model.stateprofileid = stateParams.ProfileID;
         model.statecontacts = stateParams.contacts;
         model.empid = (authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "") ? authSvc.LoginEmpid() : "";
         model.Managementid = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
         model.Admin = authSvc.isAdmin();
         if (parseInt(model.stateprofileid) !== 0) {
             model.textboxshowhide = true;
             model.EmpViewfullProfile(model.stateprofileid);
         } else {
             model.searchObjectquery = $location.search();
             model.updatepaymentllink = false;
             var meKey = Object.getOwnPropertyNames(model.searchObjectquery)[0];
             var meKeyempid = Object.getOwnPropertyNames(model.searchObjectquery)[1];
             model.selfProfileID = model.searchObjectquery[meKey];
             model.selfEmp = model.searchObjectquery[meKeyempid];
             if (model.selfProfileID) {
                 model.textboxshowhide = true;
                 model.getprofileDataencryptedID(model.selfProfileID);
             } else {
                 model.textboxshowhide = false;
             }

         }

     };
     vm.divInfo = {
         printDivId: 'printThisElement',
         styles: ['/app/employeeViewfullprofilePrint/style.css'], //Extra Styles
         title: 'View Profile',
     };
     vm.init();
 }
 angular
     .module('Kaakateeya')
     .controller('employeeViewfullprofilePrintsearchCtrl', controller);
 controller.$inject = ['employeeViewfullprofilePrintsearchModel', '$scope', 'authSvc', '$location', '$stateParams'];