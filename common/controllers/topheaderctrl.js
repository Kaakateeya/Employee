(function(angular) {
    'use strict';
    /** @ngInject */
    function ControllerCtrl(scope, authSvc, $uibModal, $state, modelpopupopenmethod,$stateParams,$window) {
        var vm = this,
            model = {};

        var modalpopupopen;
        vm.lock = false;
        vm.CurrentDate = new Date();
        vm.logincounts = [];
        model.usernameemployeepop = false;
        model.usernameemployeepasswordpop = false;
        vm.lockscreendiv = true;
        vm.initheader = function() {
            var empname = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            vm.name = authSvc.LoginEmpName();
            vm.empphoto = authSvc.empphoto();
            authSvc.getmacaddress();
            authSvc.getClientIp();
            modelpopupopenmethod.getEmployeeLoginCoutDetails().then(function(response) {
                var login = JSON.parse(response.data);
                vm.logincounts = login;
            });
            vm.usernameemployeeid = sessionStorage.getItem("usernameemployeeid");
        };
        vm.initheader();

        vm.logout = function() {
            vm.name = "";
            authSvc.logout();
            $state.go("login", {});
        };
        vm.lockscreen = function() {
            vm.lock = true;
            vm.passwordemployee = "";
            modelpopupopenmethod.showPopupphotopoup('loginContent.html', scope, 'md', "modalclassdashboardphotopopuplogin");
        };
        vm.close = function(type) {
            modelpopupopenmethod.closepopuppoptopopup();
        };


        vm.loginsubmit = function(form) {
            modelpopupopenmethod.getloginpage(form).then(function(response) {
                if (response.data !== undefined && response.data !== "" && response.data !== null) {
                    switch (response.data.m_Item5) {
                        case 1:
                            // authSvc.logout();
                            model.loginarray = response.data.m_Item1;
                            model.empphoto = response.data.m_Item1.EmpPhotoPath;
                            authSvc.user(response.data.m_Item1);
                            // $state.go("base.dashboard", {});
                            //model.loginsubmit.usernameemployee = "";
                            // model.loginsubmit.passwordemployee = "";
                            modelpopupopenmethod.closepopuppoptopopup();
                            break;
                        case 0:
                            model.errormessage = "Invalid login credentials";
                            alert("Invalid login credentials");
                            break;
                        case 2:
                            model.errormessage = "Ur Account was Deleted,Contact Admin";
                            alert("Ur Account was Deleted,Contact Admin");
                            break;
                        case 3:
                            model.errormessage = "Ur Account was Temp.Disabled,Contact Admin";
                            alert("Ur Account was Temp.Disabled,Contact Admin");
                            break;
                        case 8:
                            model.errormessage = "Ur Cannot Login With Deactivate Branch-User Account ";
                            alert("Ur Cannot Login With Deactivate Branch-User Account ");
                            break;
                        case 9:
                            model.errormessage = "Ur Account was  not Allowed To login In these Timings ";
                            alert("Ur Account was  not Allowed To login In these Timings");
                            break;
                        case 11:
                            model.errormessage = "Please Enter Reason/Permission To Login With Your Userid";
                            alert("Please Enter Reason/Permission To Login With Your Userid");
                            break;
                        case 12:
                            model.errormessage = "Please Enter Reason/Permission To Login With Your Userid";
                            alert("Please Enter Reason/Permission To Login With Your Userid");
                            break;
                        case 13:
                            model.errormessage = "Please Contact Mr.CHIRANJEEVI sir to Login With Ur UserID";
                            alert("Please Contact Mr.CHIRANJEEVI sir to Login With Ur UserID");
                            break;
                        case 14:
                            model.errormessage = "Please Contact Mr.CHIRANJEEVI sir to Login With Ur UserID";
                            alert("Please Contact Mr.CHIRANJEEVI sir to Login With Ur UserID");
                            break;
                    }
                }
            });


        };
        vm.searchredirect=function(statename,id,Profileid)
        {
            // $state.go(statename, {
            //         id:  1,
            //         Profileid: 0
            //     }, {
            //         location: "replace",
            //         //inherit: false,
            //         relative: $state.$current,
            //        // notify: false
            //     });
           // $window.location.replace("search/"+id+"/0");
            //$window.location.href="search/"+id+"/0";

        };
    }
    angular
        .module('Kaakateeya')
        .controller('headerctrl', ['$scope', 'authSvc', '$uibModal', '$state', 'modelpopupopenmethod','$stateParams','$window',
            ControllerCtrl
        ]);

}(angular));