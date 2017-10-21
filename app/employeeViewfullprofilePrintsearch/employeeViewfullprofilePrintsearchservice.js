function factory(http) {
    return {
        getEmpViewfullProfile: function(ProfileID, EmpID) {
            return http.get(app.apiroot + 'StaticPages/getCustomerViewAdminFullDetails', {
                params: {
                    ProfileID: ProfileID,
                    EmpID: EmpID
                }
            });
        },
        getdecryptedProfileID: function(profileid) {
            return http.get(app.apiroot + 'StaticPages/getdecryptedProfileID', {
                params: {
                    ProfileID: profileid
                }
            });
        }
    };
}
angular
    .module('Kaakateeya')
    .factory('employeeViewfullprofilePrintsearchService', factory);
factory.$inject = ['$http'];