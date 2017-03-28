app.service('helperservice', function() {
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
});