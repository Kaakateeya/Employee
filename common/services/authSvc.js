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
        debugger;
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
        }
    };
}]);