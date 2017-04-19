(function() {
    'use strict';

    function factory($http, uibModal, loginservice, authSvc, $state, helperservice) {
        var model = {},
            modalpopupopen;
        model.loginsubmit = {};
        model.CurrentDate = new Date();
        model.usernameemployee = false;
        model.usernameemployeepassword = false;

        // model.getip = function() {
        //     helperservice.getipAddressReturn().then(function(response) {
        //     });
        // };
        model.init = function() {
            authSvc.getmacaddress();
            authSvc.getClientIp();

            loginservice.getEmployeeLoginCoutDetails().then(function(response) {
                var login = JSON.parse(response.data);
                model.logincounts = login;
            });
        };
        model.loginsubmit = function(form, formempvalid, formpasswordvalid, formvalid) {
            if (formempvalid.required === true) {
                model.usernameemployee = true;
            }
            if (formpasswordvalid.required === true) {
                model.usernameemployeepassword = true;
            }
            if (formvalid === true) {
                loginservice.getloginpage(form).then(function(response) {
                    if (response.data !== undefined && response.data !== "" && response.data !== null) {
                        switch (response.data.m_Item5) {
                            case 1:
                                authSvc.logout();
                                model.loginarray = response.data.m_Item1;
                                model.empphoto = response.data.m_Item1.EmpPhotoPath;
                                authSvc.user(response.data.m_Item1);
                                $state.go("base.dashboard", {});
                                model.loginsubmit.usernameemployee = "";
                                model.loginsubmit.passwordemployee = "";
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
            }

        };

        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('loginModel', factory);

    factory.$inject = ['$http', '$uibModal', 'loginservice', 'authSvc', '$state', 'helperservice'];

})();