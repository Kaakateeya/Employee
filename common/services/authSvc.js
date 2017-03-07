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
        setSession('cust.id', value.CustID);
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
        clearSession('cust.id');
        sessionStorage.removeItem("loggedAscustomerPage");
    }

    function getUser() {
        return {
            custid: getSession('cust.id'),

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
        getCustId: function() {
            return getSession('cust.id');
        },
        clearUserSessionDetails: function() {
            return clearUserSession();
        },
        logout: function() {
            clearUserSession();
            route.go('home', {});
        }

    };
}]);