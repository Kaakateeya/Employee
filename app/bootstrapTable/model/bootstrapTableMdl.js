(function() {
    'use strict';



    function factory(config) {
        var model = {};
        model.init = function() {
            model = config;
            model.ProfileID = function(data) { alert('ppp'); };

            model.nameUrl = function(data) {
                return '<span>' + data.LastName + '  ' + data.FirstName + '</span>';
            };
            model.columns = [
                { text: 'ProfileID', key: 'ProfileID', type: 'link', method: model.ProfileID },
                { text: 'Name', key: 'Name', type: 'custom', templateUrl: model.nameUrl },
                { text: 'Caste', key: 'Caste', type: 'label' },
                { text: 'Profile Owner', key: 'ProfileOwner', type: 'label', templateUrl: '' },
                { text: 'Height', key: 'Height', type: 'label', templateUrl: '' },
                { text: 'Login', key: 'Login', type: 'label', templateUrl: '' },
                { text: 'Education', key: 'Education', type: 'label', templateUrl: '' },
                { text: 'Profession', key: 'Profession', type: 'label', templateUrl: '' },
                { text: 'DOB', key: 'DOB', type: 'label', templateUrl: '' }
            ];
            model.pagechange = function(mg) {
                var array = [
                    { records: 100, rowtype: 'alert alert-warning', custId: 71667, 'ProfileID': 1, 'LastName': 'ggg', 'FirstName': 'Uma', 'Caste': 21071668, 'ProfileOwner': 21071668, 'Height': 21071668, 'Login': 21071668, 'Education': 21071668, 'Profession': 21071668, 'DOB': 21071668, 'ProfileID': 21071668 },
                    { rowtype: 'alert alert-primary', custId: 71668, 'ProfileID': 2, 'LastName': 'ddd', 'FirstName': 'Vinu', 'Caste': 21071668, 'ProfileOwner': 21071668, 'Height': 21071668, 'Login': 21071668, 'Education': 21071668, 'Profession': 21071668, 'DOB': 21071668, 'ProfileID': 21071668 },
                    { rowtype: 'alert alert-danger', custId: 71669, 'ProfileID': 2, 'LastName': 'sdfsdfsdf', 'FirstName': 21071668, 'Caste': 21071668, 'ProfileOwner': 21071668, 'Height': 21071668, 'Login': 21071668, 'Education': 21071668, 'Profession': 21071668, 'DOB': 21071668, 'ProfileID': 21071668 }
                ];
                model.setData(array);
            };
            return model;
        };
        return model.init();
    }
    angular
        .module('Kaakateeya')
        .factory('bootstrapTableModel', factory)

    factory.$inject = ['complex-grid-config'];
})();