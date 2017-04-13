(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getlandingdata: function(empid, branchcode, frompage, topage, tablename, intLoadStatus) {
                return http.get(app.apiroot + 'CustomerPersonalUpdate/getEmplanding_counts_Admin', {
                    params: {
                        OwnerName: empid,
                        Branchname: branchcode,
                        StartIndex: frompage,
                        EndIndex: topage,
                        strTableType: tablename,
                        intLoadStatus: intLoadStatus
                    }
                });
            },
            getloginpage: function(form) {
                return http.get(app.apiroot + 'DB/getValidateLoginNew', {
                    params: {
                        LoginName: form.usernameemployee,
                        Password: form.passwordemployee,
                        sMAC: "183.82.98.109"
                    }
                });
            },
            uploadsettlementform: function(obj) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/UploadsettlementForm', obj);
            },
            PhotoRequest: function(ProfileID, empid) {
                return http.get(app.apiroot + 'CustomerPersonal/getCustomerphotoRequestDisplay', {
                    params: { profileid: ProfileID, EMPID: empid, ticketIDs: '' }
                });
            },
            readNotifications: function(obj) {
                return http.get(app.apiroot + 'StaticPages/getCust_NotificationDetails_Employee', { params: { EmpID: obj.EmpID, idisplay: obj.idisplay, NotificationID: obj.NotificationID, CategoryID: obj.CategoryID, CustID: obj.CustID } });
            },

            getUpdateEmailBounce: function(obj) {
                return http.get(app.apiroot + 'StaticPages/getUpdateEmailBounce', { params: { CustID: obj.CustID, EmailBounceEntryId: obj.EmailBounceEntryId, BounceMailid: obj.BounceMailid } });
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('dashboardServices', factory);
    factory.$inject = ['$http'];
})(angular);