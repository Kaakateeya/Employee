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

app.factory('authSvc', ['$injector', 'Idle', '$http', function($injector, Idle, $http) {
    function setUser(value) {

        setSession("LoginEmpid", value.EmpID);
        setSession("LoginEmpName", value.FirstName + " " + value.LastName);
        setSession("empBranchID", value.BranchID);
        setSession("isAdmin", value.isAdmin);
        setSession("isManagement", value.isManagement);
        setSession("empRegionID", value.RegionID);
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

    }

    function getUser() {
        return {
            LoginEmpid: getSession('LoginEmpid'),
            LoginEmpName: getSession('LoginEmpName'),
            empBranchID: getSession('empBranchID'),
            isAdmin: getSession('isAdmin'),
            isManagement: getSession('isManagement'),
            empRegionID: getSession('empRegionID')

        };
    }
    return {
        user: function(value) {
            if (value) {
                setUser(value);
            }
            return getUser();
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
        macAddress: function() {
            return getSession('macAddress');
        },
        clientIp: function() {
            return getSession('getClientIp');
        },
        getmacaddress: function() {
            return $http.get('/getmac').then(function(res) {
                console.log(res);
                setSession("macAddress", res.data);
                return res.data;
            });
        },
        getClientIp: function() {
            return $http.get('/getClientIp').then(function(res) {
                console.log(res);
                console.log(((res.data).indexOf("::1") !== -1));
                console.log(((res.data).indexOf("127.0.0.1") !== -1));
                var response;
                if ((res.data).indexOf("::1") !== -1 || (res.data).indexOf("127.0.0.1") !== -1) {
                    response = "183.82.98.109";
                    setSession("getClientIp", response);
                } else {
                    response = res.data;
                    setSession("getClientIp", response);
                }
                return response;
                //(((res.data).indexOf("::1") !== -1) ? "183.82.98.109" : res.data);
            });
        }
    };
}]);