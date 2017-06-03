(function() {
    'use strict';

    function factory($http) {
        return {
            getServiceSlideshowdata: function(obj) {
                return http.get(app.apiroot + 'EmployeeReportPage/ServiceSlideshowdata', obj);
            }
        };
    }

    angular
        .module('Kaakateeya')
        .factory('serviceSlideShowService', factory);
    factory.$inject = ['$http'];
})();