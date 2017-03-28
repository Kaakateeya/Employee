app.service('helperservice', ['$http', function(http) {
    this.checkstringvalue = function(value) {
        if (value !== null && value !== "" && value !== undefined) {
            return true;
        } else {
            return false;
        }
    };
    this.checkarraylength = function(value) {
        if (value !== null && value !== "" && value !== undefined && value.length > 0) {
            return true;
        } else {
            return false;
        }
    };
    this.UpdateExpressIntrestViewfullprofile = function(obj) {
        return http.post(app.apiroot + 'StaticPages/UpdateExpressIntrestViewfullprofile', obj);
    };
    this.getipAddressReturn = function() {
        debugger;
        return http.get(app.apiroot + 'StaticPages/getipAddressReturn', { params: {} });
    };
}]);