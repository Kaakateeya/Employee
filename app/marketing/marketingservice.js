(function() {
    'use strict';

    function factory(http) {
        return {
            getMarketingTicketBind: function(flag, ID) {
                return http.get(app.apiroot + 'EmployeeReportPage/getMyProfileBindings', {
                    params: {
                        flag: flag,
                        ID: ID
                    }
                });
            },

            getMarketingSlideShowBind: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/MarketingTicketHistoryInfo', obj);
            }
        };
    }

    angular
        .module('Kaakateeya')
        .factory('marketingservice', factory)
    factory.$inject = ['$http'];
})(angular);