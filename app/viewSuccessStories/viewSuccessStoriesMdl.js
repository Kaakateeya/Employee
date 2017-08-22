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

        model.viewStories = function() {
            var inobj = {
                profileID: model.profileID,
                Region: model.region,
                strCaste: model.caste ? model.caste.join(',') : null,
                strBranch: model.branch ? model.branch.join(',') : null,
                StartDate: model.fromDate,
                EndDate: model.toDate,
                PageSize: 20,
                PageNumber: 1,
                intlowerBound: 1,
                intUpperBound: 2,
                value: 1
            };

            viewSuccessStoriesService.viewSuccessStories(inobj).then(function(response) {
                if (response.data && response.data.length > 0) {
                    model.totalRows = response.data[0][0].TotalRows;
                    model.viewSuccessArray = response.data[1];
                }

            });
        };

        return model.init();

    }
})();