(function() {
    'use strict';

    function factory(reviewPendinrReportsService, configgrid) {
        return function() {
            var model = {};
            model = configgrid;
            model.mpObj = {};
            model.opendiv = true;
            model.dateOptions = {
                changeMonth: true,
                changeYear: true,
                yearRange: "-40:+5",
                dateFormat: 'dd/mm/yy',
                minDate: null,
                maxDate: null
            };
            model.MyProfilePageLoad = function() {
                reviewPendinrReportsService.getMyprofilebind(1, 2, '').then(function(response) {
                    model.mpObj.ddlProfileOwner = model.empid;
                    model.applicationStatusarray = [];
                    model.Castearray = [];
                    model.ProfileOwnerarray = [];
                    model.Brancharray = [];
                    model.mpObj.ddlProfileOwner = [parseInt(model.empid)];
                    _.each(response.data, function(item) {
                        switch (item.CountryCode) {
                            case "Application Status":
                                model.applicationStatusarray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                            case "Caste":
                                model.Castearray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                            case "Profile Owner":
                                model.ProfileOwnerarray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                            case "Branch":
                                model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                        }
                    });
                });
            };
            model.reviewpendingsubmit = function(obj, from, to, type) {

            };
        };
    }
    angular
        .module('Kaakateeya')
        .factory('reviewPendinrReportsModel', factory);

    factory.$inject = ['reviewPendinrReportsService', 'complex-grid-config'];
})();