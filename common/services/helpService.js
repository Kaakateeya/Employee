app.service('helperservice', ['$http', function(http) {
    this.checkstringvalue = function(value) {
        if (value !== null && $.trim(value) !== "" && value !== undefined) {
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

    this.acceptrejectexpressinterest = function(fromid, toid, logid, type, empid) {
        return http.get(app.apiroot + 'DashboardRequest/getInsertCustomerExpressinterest', { params: { fromcustid: fromid, tocustid: toid, logID: logid, interstTYpe: type, empid: empid } });
    };
    this.matchacceptrejectexpressinterest = function(fromid, toid, logid, type, empid) {
        return http.get(app.apiroot + 'EmployeeReportPage/getInsertMatchfollowupExpressinterest', { params: { fromcustid: fromid, tocustid: toid, logID: logid, interstTYpe: type, empid: empid } });
    };
    this.getipAddressReturn = function() {
        return http.get(app.apiroot + 'StaticPages/getipAddressReturn', { params: {} });
    };
    this.PhotoRequest = function(ProfileID, empid, ticketId) {
        return http.get(app.apiroot + 'CustomerPersonal/getCustomerphotoRequestDisplay', {
            params: { profileid: ProfileID, EMPID: empid, ticketIDs: ticketId }
        });
    };

    this.uploadsettlementform = function(obj) {
        return http.post(app.apiroot + 'CustomerPersonalUpdate/UploadsettlementForm', obj);
    };
    this.getUpdateEmailBounce = function(obj) {
        return http.get(app.apiroot + 'StaticPages/getUpdateEmailBounce', { params: { CustID: obj.CustID, EmailBounceEntryId: obj.EmailBounceEntryId, BounceMailid: obj.BounceMailid } });
    };

    this.readNotifications = function(obj) {
        return http.get(app.apiroot + 'StaticPages/getCust_NotificationDetails_Employee', { params: { EmpID: obj.EmpID, idisplay: obj.idisplay, NotificationID: obj.NotificationID, CategoryID: obj.CategoryID, CustID: obj.CustID } });
    };
    this.ResendMail = function(obj) {
        return http.post(app.apiroot + 'EmployeeReportPage/MatchFollowupResendMail', obj);
    };

    this.insertSingleValue = function(id, value, flag) {
        return http.get(app.apiroot + 'smallPages/getinsertImagepath', { params: { whereId: id, strvalue: value, flag: flag } });
    };
    this.empLogout = function(empID) {
        return http.get(app.apiroot + 'smallPages/getEmpLogout', { params: { empid: empID } });
    };
    this.getMyprofilebind = function(flag, ID) {
        return http.get(app.apiroot + 'EmployeeReportPage/getMyProfileBindings', {
            params: {
                flag: flag,
                ID: ID,
            }
        });
    };
    this.closereminderstatus = function(obj) {
        return http.post(app.apiroot + 'EmployeeReportPage/CloseReminderStatus', obj);
    };
    this.Employeemenulist = function(empid) {
        return http.get(app.apiroot + 'EmployeeReportPage/getEmployeeMenulist', { params: { Empid: empid } });
    };
}]);