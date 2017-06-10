(function() {
    'use strict';

    function factory(http) {
        return {
            getServiceSlideshowdata: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/ServiceSlideshowdata', obj);
            },
            getInsertUnpaidStatus: function(custid, tocustid, empid, typeofaction) {
                return http.get(app.apiroot + 'StaticPages/getInsertUnpaidStatus', { params: { fromCustID: custid, ToCustID: tocustid, Empid: empid, typeofAction: typeofaction } });
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('serviceSlideShowService', factory);
    factory.$inject = ['$http'];
})();