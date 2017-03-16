(function() {
    'use strict';

    function factory($http, uibModal, loginservice, route, authSvc, $state) {
        var model = {},
            modalpopupopen;
        model.loginsubmit = {};
        model.CurrentDate = new Date();
        model.usernameemployee = false;
        model.init = function() {
            authSvc.getmacaddress();
            authSvc.getClientIp();

            loginservice.getEmployeeLoginCoutDetails().then(function(response) {
                console.log(response.data);
                var login = JSON.parse(response.data);
                model.logincounts = login;
            });
        };
        model.loginsubmit = function(form) {
            model.usernameemployee = true;
            loginservice.getloginpage(form).then(function(response) {
                authSvc.clearUserSessionDetails();
                if (response.data !== undefined && response.data !== "" && response.data !== null) {
                    switch (response.data.m_Item5) {
                        case 1:
                            console.log(response.data);
                            model.loginarray = response.data.m_Item1;
                            model.empphoto = response.data.m_Item1.EmpPhotoPath;
                            authSvc.user(response.data.m_Item1);
                            $state.go("dashboard", {});
                            break;
                        case 0:
                            model.errormessage = "Invalid login credentials";
                            break;
                        case 2:
                            model.errormessage = "Ur Account was Deleted,Contact Admin";
                            break;
                        case 3:
                            model.errormessage = "Ur Account was Temp.Disabled,Contact Admin";
                            break;
                        case 8:
                            model.errormessage = "Ur Cannot Login With Deactivate Branch-User Account ";
                            break;
                        case 9:
                            model.errormessage = "Ur Account was  not Allowed To login In these Timings ";
                            break;
                        case 11:
                            model.errormessage = "Please Enter Reason/Permission To Login With Your Userid";
                            break;
                        case 12:
                            model.errormessage = "Please Enter Reason/Permission To Login With Your Userid";
                            break;
                        case 13:
                            model.errormessage = "Please Contact Mr.CHIRANJEEVI sir to Login With Ur UserID";
                            break;
                        case 14:
                            model.errormessage = "Please Contact Mr.CHIRANJEEVI sir to Login With Ur UserID";
                            break;
                    }
                }
            });

        };

        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('loginModel', factory);

    factory.$inject = ['$http', '$uibModal', 'loginservice', 'route', 'authSvc', '$state'];

})();