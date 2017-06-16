(function() {
    'use strict';


    function factory(http) {
        return {
            getoldpaymentstatus: function(ProfileID) {
                return http.get(app.apiroot + 'StaticPages/getCustomerProfileIDstatus', { params: { ProfileID: ProfileID } });

            },
            getoldpaymentdata: function(ProfileID, BranchID) {
                return http.get(app.apiroot + 'StaticPages/getCustomerParofileIDbasePayment', { params: { ProfileID: ProfileID, BranchID: BranchID } });
            }
        };
    }

    angular
        .module('Kaakateeya')
        .factory('oldPaymenttableService', factory);

    factory.$inject = ['$http'];
})();