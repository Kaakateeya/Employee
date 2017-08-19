(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('ReportsofEmployeesModel', factory);

    factory.$inject = ['ReportsofEmployeesService'];

    function factory(ReportsofEmployeesService) {

        var model = {};
        model.arrayheader = ["EmpName", "NoofProfiles", "NoServices", "NoLogin", "EMNV", "Paid", "Unpaid"];
        model.modelarray = [{
            facility: "Admin",
            code: "230",
            cost: 100,
            conditionRating: 52,
            extent: 50,
            planYear: 20,
            Plansss: 100

        }, {
            facility: "Jyothi",
            code: "230",
            cost: 100,
            conditionRating: 52,
            extent: 50,
            planYear: 20,
            Plansss: 100
        }, {
            facility: "Kalpana",
            code: "230",
            cost: 100,
            conditionRating: 52,
            extent: 50,
            planYear: 20,
            Plansss: 100
        }, {
            facility: "Santhi",
            code: "230",
            cost: 100,
            conditionRating: 52,
            extent: 50,
            planYear: 20,
            Plansss: 100
        }, ];
        return model;

    }
})();