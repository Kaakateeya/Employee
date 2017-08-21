(function() {
    'use strict';

    function factory(http) {
        var ProfileID = null;
        return {
            getViewCustomerData: function(obj) {
                return http.post(app.apiroot + 'CustomerPersonal/Search_ViewEditProfile', obj);
            },
            playbtnProfileData: function(profileid) {
                return http.get(app.apiroot + 'CustomerPersonal/getProfileIDPlaybutton', {
                    params: {
                        ProfileID: profileid
                    }
                });
            },
            SettleDeleteInactive: function(custID, typeOfData) {
                return http.get(app.apiroot + 'CustomerPersonal/getViewAllCustomersSettledeleteinfo', { params: { CustID: custID, typeofdata: typeOfData } });
            },
            geMMseriesData: function(PrfileID, Empid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getmmSeriesData', { params: { profileID: PrfileID, empid: Empid } });
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('editViewprofileservice', factory);
    factory.$inject = ['$http'];

})();