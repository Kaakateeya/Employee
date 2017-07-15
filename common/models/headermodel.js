(function() {
    'use strict';


    angular
        .module('Kaakateeya')
        .factory('topheadermodel', ['$http', 'authSvc', 'modelpopupopenmethod', '$state', 'alert', function(http, authSvc,
            modelpopupopenmethod, $state, alerts) {
            var model = {};
            model.lock = false;
            model.CurrentDate = new Date();
            model.logincounts = [];
            model.usernameemployeepop = false;
            model.usernameemployeepasswordpop = false;
            model.lockscreendiv = true;
            model.init = function() {
                model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                //pageload Callings
                model.name = authSvc.LoginEmpName();
                model.empphoto = authSvc.empphoto();
                modelpopupopenmethod.getEmployeeLoginCoutDetails().then(function(response) {
                    model.logincounts = JSON.parse(response.data[0]);
                });
                model.usernameemployeeid = sessionStorage.getItem("usernameemployeeid");
                return model;
            };

            model.logout = function() {
                model.name = "";
                authSvc.logout();
                $state.go("base.login", {});
            };

            model.lockscreen = function() {
                model.lock = true;
                model.passwordemployee = "";
                modelpopupopenmethod.showPopupphotopoup('loginContent.html', model.scope, 'md', "modalclassdashboardphotopopuplogin");
            };
            model.close = function(type) {
                modelpopupopenmethod.closepopuppoptopopup();
            };

            model.loginsubmit = function(form) {
                modelpopupopenmethod.getloginpage(form).then(function(response) {
                    if (response.data !== undefined && response.data !== "" && response.data !== null) {
                        switch (response.data.m_Item5) {
                            case 1:
                                model.loginarray = response.data.m_Item1;
                                model.empphoto = response.data.m_Item1.EmpPhotoPath;
                                authSvc.user(response.data.m_Item1);
                                //sessionStorage.setItem("usernameemployeeid", model.loginsubmit.usernameemployee);
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
            model.searchredirect = function(id, Profileid) {
                $state.go("base.searchpage", { id: id, Profileid: Profileid }, { reload: true });
            };
            model.changepassword = function(form) {
                console.log(form);
                modelpopupopenmethod.getChangeEmployeePassword(model.empid, form.model.currentpassword, form.model.confirmpassword).then(function(response) {
                    console.log(response);
                    if (parseInt(response.data) === 1) {
                        alerts.timeoutoldalerts(model.scope, 'alert-success', 'Password Changed Successfully', 3000);
                        modelpopupopenmethod.closepopuppoptopopup();
                        model.currentpassword = "";
                        model.newpassword = "";
                        model.confirmpassword = "";
                    } else {
                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Password Changed Fail', 3000);
                    }
                });
            };
            model.chkpassword = function(password) {
                modelpopupopenmethod.getCheckemployeePassord(model.empid, password).then(function(response) {
                    console.log(response);
                    if (parseInt(response.data) === 1) {

                    } else {
                        model.currentpassword = "";
                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'please Enter valid Password', 3000);
                    }
                });
            };
            model.changepasswordpopup = function() {
                modelpopupopenmethod.showPopupphotopoup('changepassword.html', model.scope, 'md', "modalclassdashboardphotopopuplogin");
            };
            return model.init();
        }]);

})(angular);