(function(angular) {
    'use strict';

    function factory(http) {
        return {
            generalsearchsubmit: function(obj) {
                return http.post(app.apiroot + 'CustomerSearch/ShowDataForEmployeeGeneral', obj);
            },
            advancedsearchsubmit: function(obj) {
                return http.post(app.apiroot + 'CustomerSearch/ShowDataForEmployeeAdvanceSearch', obj);
            },
            getPrimaryCustomerDataResponse: function(profileid, EmpID) {
                return http.get(app.apiroot + 'CustomerSearch/getPrimaryCustomerDataResponse', {
                    params: {
                        ProfileID: profileid,
                        EmpID: EmpID
                    }
                });
            },
            getrelationships: function(flag, profileid, about) {
                return http.get(app.apiroot + 'CustomerPersonal/getCustomerPersonaloffice_purpose', {
                    params: {
                        flag: flag,
                        ID: profileid,
                        AboutProfile: about,
                        IsConfidential: "",
                        HighConfendential: ""
                    }
                });
            },
            getshortlistprofiles: function(custids) {
                return http.get(app.apiroot + 'EmployeeReportPage/getMarketingSldeshowshortlistprofiles', {
                    params: {
                        CustID: custids
                    }
                });
            },
            insertbookmark: function(Mobj) {
                return http.post(app.apiroot + 'EmployeeReportPage/SaveViewedBookmark_Customer', Mobj);
            },
            getprofileidcustdetails: function(custids) {
                return http.get(app.apiroot + 'EmployeeReportPage/getSendServiceProfileIDs', {
                    params: {
                        ProfileIDs: custids
                    }
                });
            },
            getInsertUnpaidStatus: function(custid, tocustid, empid, typeofaction) {
                return http.get(app.apiroot + 'StaticPages/getInsertUnpaidStatus', { params: { fromCustID: custid, ToCustID: tocustid, Empid: empid, typeofAction: typeofaction } });
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('searchpageServices', factory);
    factory.$inject = ['$http'];
})(angular);