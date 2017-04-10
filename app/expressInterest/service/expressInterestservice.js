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
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('expressInterestService', factory);
    factory.$inject = ['$http'];
})(angular);