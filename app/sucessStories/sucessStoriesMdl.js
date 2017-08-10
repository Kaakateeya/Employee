(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('sucessStoriesModel', ['sucessStoriesService',
            function(sucessStoriesService) {
                var model = {};
                model.dateOptions = {
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-40:+5",
                    dateFormat: 'dd/mm/yy',
                    minDate: null,
                    maxDate: null
                };
                model.submitsuccessstories = function() {
                    alert(1);
                };
                model.resetsuccessstories = function() {

                };
                return model;
            }
        ]);
})();