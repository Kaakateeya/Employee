(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('emailBounceReportModel', factory);

    factory.$inject = ['emailBounceReportService'];

    function factory(emailBounceReportService) {

        var model = {};

        return model;

    }
})();