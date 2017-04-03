(function() {
    'use strict';



    function factory(http) {
        var ProfileID = null;
        return {

            getViewCustomerData: function(EmpID, ProfileIDName, ProfileIDStatus) {
                debugger;
                return http.get(app.apiroot + 'CustomerPersonal/getViewAllCustomersSearch', {
                    params: {
                        EmpID: EmpID,
                        SearchData: ProfileIDName,
                        ProfileIDStatus: ProfileIDStatus,
                        StartIndex: 1,
                        EndIndex: 10
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
            }


        };
    }
    angular
        .module('Kaakateeya')
        .factory('editViewprofileservice', factory);
    factory.$inject = ['$http'];

})();