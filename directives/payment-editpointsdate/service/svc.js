(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('paymenteditpointsservice', factory);
    factory.$inject = ['$http'];

    function factory(http) {
        return {
            paymenteditsubmit: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/Editpaymentpointexpdate', obj);
            },

        };
    }
})();