(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('fixedtableTestingModel', factory)

    factory.$inject = ['fixedtableTestingService', 'alert', 'SelectBindService'];

    function factory(fixedtableTestingService, alerts, SelectBindService) {
        var model = {};
        model.arrayheader = ["Facility", "Unit code", "Cost", "Condition score", "Replace", "Plan", "Plansss", "Plansssdddddd", "ddddddddddd", "ddddddddddddddddd"];
        model.modelarray = [{
            facility: "Atlanta",
            code: "C-RD34",
            cost: 540000,
            conditionRating: 52,
            extent: 100,
            planYear: 2014,
            Plansss: 90000,
            Plansssdddddd: 99999,
            ddddddddddd: 999000,
            ddddddddddddddddd: 98999

        }, {
            facility: "Seattle",
            code: "CRDm-4",
            cost: 23000,
            conditionRating: 40,
            extent: 88,
            planYear: 2014
        }, {
            facility: "Austin",
            code: "GR-5",
            cost: 1200000,
            conditionRating: 92,
            extent: 90,
            planYear: 2014
        }, {
            facility: "Dayton",
            code: "LY-7",
            cost: 123000,
            conditionRating: 71,
            extent: 98,
            planYear: 2014
        }, {
            facility: "Portland",
            code: "Dm-4",
            cost: 149000,
            conditionRating: 89,
            extent: 77,
            planYear: 2014
        }, {
            facility: "Dallas",
            code: "AW-3",
            cost: 14000,
            conditionRating: 89,
            extent: 79,
            planYear: 2014
        }, {
            facility: "Houston",
            code: "Dm-4",
            cost: 1100000,
            conditionRating: 93,
            extent: 79,
            planYear: 2014
        }, {
            facility: "Boston",
            code: "DD3",
            cost: 1940000,
            conditionRating: 86,
            extent: 80,
            planYear: 2015
        }, {
            facility: "New York",
            code: "ER1",
            cost: 910000,
            conditionRating: 87,
            extent: 82,
            planYear: 2015
        }];
        model.communicationlogsubmit = function(profileid) {
            model.sendarray = [];
            SelectBindService.checkProfileID(profileid).then(function(respo) {
                if (respo.data && parseInt(respo.data) === 1) {
                    fixedtableTestingService.Submitcommunicationlog(profileid, model.empid).then(function(response) {
                        if ((response.data[0]).length !== 0 || (response.data[1]).length !== 0 || (response.data[2]).length !== 0 || (response.data[3]).length !== 0) {
                            model.sendarray = response.data[0];
                        }
                    });

                } else {
                    model.Profileidcommunication = '';
                    alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter valid profileID', 30000);
                }
            });
        };
        return model;

    }
})();