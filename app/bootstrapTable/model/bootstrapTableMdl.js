(function() {
    'use strict';



    function factory($http) {
        var model = {};
        model.init = function() {
            model.test = 'dddd';
            model.headings = ['Profile', 'LastName', 'Firstname', 'caste', 'ProfileOwner', 'height'];

            model.ProfileID = function(data) { alert('ppp'); };
            model.nameUrl = function(data) {
                return '<span>' + data.LastName + '  ' + data.FirstName + '</span>';
            };
            model.columns = [
                { text: 'ProfileID', key: 'ProfileID', type: 'link', templateUrl: model.ProfileIDUrl, method: model.ProfileID },
                { text: 'Name', key: 'Name', type: 'custom', templateUrl: model.nameUrl },
                { text: 'Caste', key: 'Caste', type: 'label' },
                { text: 'Profile Owner', key: 'ProfileOwner', type: 'label', templateUrl: '' },
                { text: 'Height', key: 'Height', type: 'label', templateUrl: '' },
                { text: 'Login', key: 'Login', type: 'label', templateUrl: '' },
                { text: 'Education', key: 'Education', type: 'label', templateUrl: '' },
                { text: 'Profession', key: 'Profession', type: 'label', templateUrl: '' },
                { text: 'DOB', key: 'DOB', type: 'label', templateUrl: '' }
            ]

            return model;
        };
        return model.init();
    }
    angular
        .module('Kaakateeya')
        .factory('bootstrapTableModel', factory)

    factory.$inject = ['$http'];
})();