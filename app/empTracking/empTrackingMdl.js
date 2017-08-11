(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('empTrackingModel', factory);

    factory.$inject = ['empTrackingService', 'commonFactory', 'complex-grid-config'];

    function factory(empTrackingService, commonFactory, config) {

        var model = {};
        model = config;
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'mm-dd-yy'
        };
        model.init = function() {
            model.hrsbindArr = commonFactory.numberBindWithZeros('Hours', 1, 14);
            model.wrkngHrs = '';
            return model;
        };
        model.getEmpReport = function() {
            model.columns = [
                { text: 'Sno', key: 'Sno', type: 'label' },
                { text: 'Employee name', key: 'Name', type: 'label' },
                { text: 'Date of Joining', key: 'DateOfJoining', type: 'label' },
                { text: 'Official contact', key: 'OfficialContactNumber', type: 'label' },
                { text: 'Work phone', key: 'WorkPhone', type: 'label' },
                { text: 'Email Id', key: 'EmailId', type: 'label' },
                { text: 'Branch', key: 'BranchId', type: 'label' },
                { text: 'Total Worked Hours', key: 'TotalWorkedHours', type: 'morelinks' },
                { text: 'Actions', key: '', type: 'morelinks' }
            ];
            var inobj = {
                EmpUserID: null,
                Branch: model.branch,
                EmployeeName: model.empNames,
                WorkingHours: model.wrkngHrs,
                StartDate: model.fromdate,
                EndDate: model.toDate,
                FromRange: 1,
                ToRange: 100,
                PageNumber: 1,
                PageSize: 100,
                flag: 0
            };
            empTrackingService.getempReport(inobj).then(function(response) {
                model.date = response.data[0];
            });
        };

        return model.init();

    }
})();