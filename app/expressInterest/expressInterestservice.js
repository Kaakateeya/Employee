(function() {
    'use strict';

    function factory(http) {
        return {
            getEIprofileID: function(flag, ID, RelationShipID) {

                return http.get(app.apiroot + 'ExpressInterest/getExpressInterest_linq', {
                    params: {
                        flag: flag,
                        ID: ID,
                        RelationShipID: RelationShipID
                    }
                });
            },
            submitExpressintrst: function(ExpArrInput) {
                return http.post(app.apiroot + 'ExpressInterest/ExpressInterest', ExpArrInput);
            },
            getprofileidcustdetails: function(custids) {
                return http.get(app.apiroot + 'EmployeeReportPage/getSendServiceProfileIDs', {
                    params: {
                        ProfileIDs: custids
                    }
                });
            },
            getServiceInfo: function(FromProfileID, ToProfileID) {
                return http.get(app.apiroot + 'ExpressInterest/getServiceInfo', {
                    params: {
                        FromProfileID: FromProfileID,
                        ToProfileID: ToProfileID
                    }
                });
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('expressInterestService', factory);
    factory.$inject = ['$http'];
})(angular);