(function() {
    'use strict';



    function factory($http) {
        var model = {};
        model.init = function() {
            model.test = 'dddd';
            model.headings = ['Profile', 'LastName', 'Firstname', 'caste', 'ProfileOwner', 'height'];
            model.columns = [
                { key: 'ProfileID', type: 'link', templateUrl: '', method: 'mg' },
                { key: 'Last Name', type: 'label', templateUrl: '' },
                { key: 'First Name', type: 'label', templateUrl: '' },
                { key: 'Caste', type: 'label' },
                { key: 'ProfileOwner', type: 'label', templateUrl: '' },
                { key: 'Height', type: 'label', templateUrl: '' },
                { key: 'Login', type: 'label', templateUrl: '' },
                { key: 'Education', type: 'label', templateUrl: '' },
                { key: 'Profession', type: 'label', templateUrl: '' },
                { key: 'DOB', type: 'label', templateUrl: '' }
            ];

            model.data = [
                { 'ProfileID': 1, 'Last Name': 'kusumuru', 'First Name': 'Uma', 'Caste': 21071668, 'ProfileOwner': 21071668, 'Height': 21071668, 'Login': 21071668, 'Education': 21071668, 'Profession': 21071668, 'DOB': 21071668, 'ProfileID': 21071668 },
                { 'ProfileID': 2, 'Last Name': 'Anasuri', 'First Name': 'Vinu', 'Caste': 21071668, 'ProfileOwner': 21071668, 'Height': 21071668, 'Login': 21071668, 'Education': 21071668, 'Profession': 21071668, 'DOB': 21071668, 'ProfileID': 21071668 },
                { 'ProfileID': 2, 'Last Name': 21071668, 'First Name': 21071668, 'Caste': 21071668, 'ProfileOwner': 21071668, 'Height': 21071668, 'Login': 21071668, 'Education': 21071668, 'Profession': 21071668, 'DOB': 21071668, 'ProfileID': 21071668 }

            ];
            model.mg = function() {
                alert(1);
            }
            return model;
        };
        return model.init();
    }
    angular
        .module('Kaakateeya')
        .factory('bootstrapTableModel', factory)

    factory.$inject = ['$http'];
})();