(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('viewSuccessStoriesModel', factory)

    factory.$inject = ['viewSuccessStoriesService', 'Commondependency'];

    function factory(viewSuccessStoriesService, Commondependency) {

        var model = {};
        model.init = function() {
            model.branchArr = Commondependency.branch('');
            return model;
        };
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'mm-dd-yy'
        };
        model.dependencyChange = function(parentval) {
            model.branchArr = Commondependency.branch(parentval);
        };
        return model.init();

    }
})();