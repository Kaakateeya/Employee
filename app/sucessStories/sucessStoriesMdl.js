(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('sucessStoriesModel', ['sucessStoriesService',
            function(sucessStoriesService) {
                var model = {};
                model.submitsuccessstories = function() {
                    alert(1);
                };
                model.resetsuccessstories = function() {

                };
                return model;
            }
        ]);
})();