//  app.factory('authInterceptor', ['$rootScope', '$q', '$window', 'authSvc', function ($rootScope, $q, $window, authSvc) {
//     return {
//       request: function (config) {
//         config.headers = config.headers || {};
//         var user = authSvc.user();
//         if (user.token) {
//           config.headers.Authorization = 'Bearer ' + user.token;
//         }
//         return config;
//       },
//       responseError: function (rejection) {
//         if (rejection.status === 401) {
//           // handle the case where the user is not authenticated
//         }
//         return $q.reject(rejection);
//       }
//     };
//   }]);

app.factory('authSvc', ['$injector', 'Idle', '$http', 'helperservice', function($injector, Idle, $http, helperservice) {
    function setUser(value) {
        setSession("LoginEmpid", value.EmpID);
        setSession("LoginEmpName", value.FirstName + " " + value.LastName);
        setSession("empBranchID", value.BranchID);
        setSession("isAdmin", value.isAdmin);
        setSession("isManagement", value.isManagement);
        setSession("empRegionID", value.RegionID);
        setSession("empphoto", value.EmpPhotoPath);
    }

    function getSession(key) {
        return sessionStorage.getItem(key);
    }

    function setSession(key, value) {
        if (value === undefined || value === null) {
            clearSession(key);
        } else {
            sessionStorage.setItem(key, value);
        }
    }

    function clearSession(key) {
        sessionStorage.removeItem(key);
    }

    function clearUserSession() {
        clearSession('LoginEmpid');
        clearSession('LoginEmpName');
        clearSession('empBranchID');
        clearSession('isAdmin');
        clearSession('isManagement');
        clearSession('empRegionID');
        clearSession('macAddress');
        clearSession('empphoto');
        clearSession("usernameemployeeid");
    }

    function getUser() {
        return {
            LoginEmpid: getSession('LoginEmpid'),
            LoginEmpName: getSession('LoginEmpName'),
            empBranchID: getSession('empBranchID'),
            isAdmin: getSession('isAdmin'),
            isManagement: getSession('isManagement'),
            empRegionID: getSession('empRegionID'),
            // usernameemployee: getSession("usernameemployee")
        };
    }
    return {
        user: function(value) {
            if (value) {
                setUser(value);
            }
            return getUser();
        },
        userempid: function(value) {
            setSession("usernameemployee", value);
        },
        isAuthenticated: function() {
            return !!getSession('cust.id');
        },
        clearUserSessionDetails: function() {
            return clearUserSession();
        },
        logout: function() {
            clearUserSession();
            //route.go('home', {});
        },
        LoginEmpid: function() {
            return getSession('LoginEmpid');
        },
        LoginEmpName: function() {
            return getSession('LoginEmpName');
        },
        empBranchID: function() {
            return getSession('empBranchID');
        },
        isAdmin: function() {
            return getSession('isAdmin');
        },
        isManagement: function() {
            return getSession('isManagement');
        },
        empRegionID: function() {
            return getSession('empRegionID');
        },
        empphoto: function() {
            return getSession('empphoto');
        },
        macAddress: function() {
            return getSession('macAddress');
        },
        clientIp: function() {
            return getSession('getClientIp');
        },
        getmacaddress: function() {
            return $http.get('/getmac').then(function(res) {
                setSession("macAddress", res.data);
                return res.data;
            });
        },
        // usernameemployee: function() {
        //     return getSession("usernameemployee");
        // },

        // getClientIp: function() {
        //     return $http.get('/getClientIp').then(function(res) {
        //         console.log(res);
        //         console.log(((res.data).indexOf("::1") !== -1));
        //         console.log(((res.data).indexOf("127.0.0.1") !== -1));
        //         var response;
        //         if ((res.data).indexOf("::1") !== -1 || (res.data).indexOf("127.0.0.1") !== -1) {
        //             response = "183.82.98.109";
        //             setSession("getClientIp", response);
        //         } else {
        //             response = res.data;
        //             setSession("getClientIp", response);
        //         }
        //         return response;
        //     });
        // },
        getClientIp: function() {
            helperservice.getipAddressReturn().then(function(response) {
                var responsedata;
                if ((response.data).indexOf("::1") !== -1 || (response.data).indexOf("127.0.0.1") !== -1) {
                    responsedata = "183.82.98.109";
                    setSession("getClientIp", responsedata);
                } else {
                    responsedata = response.data;
                    setSession("getClientIp", responsedata);
                }
                return responsedata;
            });
        },
        getpaidstatus: function() {
            return getSession('cust.paidstatus');
        },
        login: function(username, password) {

            var body = {
                Username: username,
                Password: password
            };
            return $injector.invoke(function($http) {
                return $http.post(app.apiroot + 'DB/userLogin/person', body)
                    .then(function(response) {
                        if (response.status === 200) {
                            return { success: true, response: response.data };
                        }
                        return { success: false, response: response.data };
                    });
            });
        }
    };
}]);