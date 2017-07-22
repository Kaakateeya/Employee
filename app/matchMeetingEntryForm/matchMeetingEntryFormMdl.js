(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('matchMeetingEntryFormModel', factory)

    factory.$inject = ['matchMeetingEntryFormService'];

    function factory(matchMeetingEntryFormService) {
        return function() {
            var model = {};

            return model;
        };
    }
})();