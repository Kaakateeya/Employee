(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('loginModel', ['$http', '$uibModal', 'loginservice', 'authSvc', '$state', function($http, uibModal, loginservice, authSvc, $state) {
            var model = {},
                modalpopupopen;
            model.loginsubmitobj = {};
            model.CurrentDate = new Date();
            model.usernameemployee = false;
            model.usernameemployeepassword = false;
            model.init = function() {
                model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                // authSvc.getmacaddress();
                authSvc.getClientIp();
                return model;
            };
            model.loginsubmitmethod = function(form, formempvalid, formpasswordvalid, formvalid) {
                if (form.passwordemployee === "" || form.passwordemployee === null || form.passwordemployee === undefined) {
                    model.usernameemployeepassword = true;
                }
                if (form.usernameemployee === "" || form.usernameemployee === null || form.usernameemployee === undefined) {
                    model.usernameemployee = true;
                }
                if (formvalid === true) {
                    loginservice.getloginpage(form).then(function(response) {
                        console.log(response.data);
                        if (response.data !== undefined && response.data !== "" && response.data !== null) {
                            switch (response.data.m_Item5) {
                                case 1:
                                    authSvc.logout();
                                    model.loginarray = response.data.m_Item1;
                                    model.empphoto = response.data.m_Item1.EmpPhotoPath;
                                    authSvc.user(response.data.m_Item1);
                                    sessionStorage.setItem("usernameemployeeid", model.loginsubmitobj.usernameemployee);
                                    $state.go("base.dashboard", {});
                                    model.loginsubmitobj.usernameemployee = "";
                                    model.loginsubmitobj.passwordemployee = "";
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
                                default:
                                    model.errormessage = "Invalid UserName/Password";
                                    alert("Invalid UserName/Password");
                                    break;
                            }
                        } else {
                            model.errormessage = "Invalid UserName/Password";
                            alert("Invalid UserName/Password");
                        }
                    });
                }
            };
            return model;
        }]);
})();