(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('mailViewFullProfileservice', factory)

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            getphotoslideimages: function(custid) {
                return http.get(app.apiroot + 'StaticPages/GetPhotoSlideImages', { params: { CustID: custid } });
            },
            acceptrejectexpressinterest: function(fromid, toid, logid, type, empid) {
                return http.get(app.apiroot + 'DashboardRequest/getInsertCustomerExpressinterest', { params: { fromcustid: fromid, tocustid: toid, logID: logid, interstTYpe: type, empid: "" } });
            },
            getExpressinterst_bookmark_ignore_data: function(Loggedcustid, ToCustID) {
                return http.get(app.apiroot + 'StaticPages/getExpressinterst_bookmark_ignore_data', { params: { Loggedcustid: Loggedcustid, ToCustID: ToCustID } });
            },
            getExpressIntrstfullprofile: function(fromprofileid, empid) {
                return http.get(app.apiroot + 'StaticPages/getExpressIntrstfullprofile', { params: { FromProfileID: fromprofileid, EmpID: empid } });
            },
            UpdateExpressIntrestViewfullprofile: function(obj) {
                return http.post(app.apiroot + 'StaticPages/UpdateExpressIntrestViewfullprofile', obj);
            },
            getViewFullProfileMail: function(OriginalString) {
                return http.get('http://183.82.0.58:8010/Api/StaticPages/getViewFullProfileMail', { params: { OriginalString: OriginalString } });
            }
        };
    }
})();