(function(angular) {
    'use strict';
    /** @ngInject */
    function ControllerCtrl(scope, authSvc, uibModal, loginservice, dashboardModel) {
        var vm = this;
        var modalpopupopen;
        vm.lock = false;
        vm.CurrentDate = new Date();
        vm.showpopup = function(url, scope, size) {
            modalpopupopen = uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: url,
                scope: scope,
                backdrop: 'static',
                size: size,
                keyboard: false,
                windowClass: 'allignmiddle'
            });
        };
        vm.initheader = function() {
            var empname = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            authSvc.getmacaddress();
            authSvc.getClientIp();
            if (empname === "" || empname === undefined || empname === null) {
                vm.showpopup('loginContent.html', scope, 'md');
            } else {
                vm.name = authSvc.LoginEmpName();
                vm.empphoto = authSvc.empphoto();
            }
        };
        vm.initheader();
        vm.closepopup = function() {
            modalpopupopen.close();
        };
        vm.loginsubmit = function(form) {
            loginservice.getloginpage(form).then(function(response) {
                authSvc.clearUserSessionDetails();
                if (response.data !== undefined && response.data !== "" && response.data !== null) {
                    switch (response.data.m_Item5) {
                        case 1:
                            debugger;
                            modalpopupopen.close();
                            console.log(response.data);
                            vm.loginarray = response.data.m_Item1;
                            vm.empphoto = response.data.m_Item1.EmpPhotoPath;
                            authSvc.user(response.data.m_Item1);
                            vm.name = response.data.m_Item1.FirstName + " " + response.data.m_Item1.LastName;
                            dashboardModel.init();
                            break;
                        case 0:
                            vm.errormessage = "Invalid login credentials";
                            break;
                        case 2:
                            vm.errormessage = "Ur Account was Deleted,Contact Admin";
                            break;
                        case 3:
                            vm.errormessage = "Ur Account was Temp.Disabled,Contact Admin";
                            break;
                        case 8:
                            vm.errormessage = "Ur Cannot Login With Deactivate Branch-User Account ";
                            break;
                        case 9:
                            vm.errormessage = "Ur Account was  not Allowed To login In these Timings ";
                            break;
                        case 11:
                            vm.errormessage = "Please Enter Reason/Permission To Login With Your Userid";
                            break;
                        case 12:
                            vm.errormessage = "Please Enter Reason/Permission To Login With Your Userid";
                            break;
                        case 13:
                            vm.errormessage = "Please Contact Mr.CHIRANJEEVI sir to Login With Ur UserID";
                            break;
                        case 14:
                            vm.errormessage = "Please Contact Mr.CHIRANJEEVI sir to Login With Ur UserID";
                            break;
                    }
                }
            });
        };
        vm.logout = function() {
            vm.showpopup('loginContent.html', scope, 'md');
            vm.name = "";
            authSvc.logout();
        };
        vm.lockscreen = function() {
            vm.lock = true;
            vm.passwordemployee = "";
            vm.showpopup('loginContent.html', scope, 'md');
        };
    }
    angular
        .module('Kaakateeya')
        .controller('headerctrl', ['$scope', 'authSvc', '$uibModal', 'loginservice', 'dashboardModel',
            ControllerCtrl
        ]);

}(angular));