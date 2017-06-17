app.factory('authSvc', ['$injector', 'Idle', '$http', 'helperservice', function($injector, Idle, $http, helperservice) {
    function setUser(value) {
        setSession("LoginEmpid", value.EmpID);
        setSession("LoginEmpName", value.FirstName);
        setSession("empBranchID", value.BranchID);
        setSession("isAdmin", value.isAdmin);
        setSession("isManagement", value.isManagement);
        setSession("empRegionID", value.RegionID);
        setSession("empphoto", value.EmpPhotoPath);
        setSession("logintime", moment().format('MM/DD/YYYY'));

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