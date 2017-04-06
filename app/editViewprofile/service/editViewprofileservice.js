(function() {
    'use strict';



    function factory(http) {
        var ProfileID = null;
        return {

            getViewCustomerData: function(EmpID, ProfileIDName, ProfileIDStatus, from, to) {
                debugger;
                return http.get(app.apiroot + 'CustomerPersonal/getViewAllCustomersSearch', {
                    params: {
                        EmpID: EmpID,
                        SearchData: ProfileIDName,
                        ProfileIDStatus: ProfileIDStatus,
                        StartIndex: from,
                        EndIndex: to
                    }
                });
            },
            kmplprofileIDData: function(EmpID, ProfileIDName) {
                return http.get(app.apiroot + 'CustomerPersonal/getViewAllCustomersKMPLProfileID', {
                    params: {
                        EmpID: EmpID,
                        SearchData: ProfileIDName
                    }
                });
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
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('editViewprofileservice', factory);
    factory.$inject = ['$http'];

})();