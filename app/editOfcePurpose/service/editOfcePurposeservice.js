(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getofficeData: function(iflag, obj, text) {
                return http.get(app.apiroot + 'CustomerPersonal/getCustomerPersonaloffice_purpose', { params: { flag: iflag, ID: obj, AboutProfile: text, IsConfidential: '', HighConfendential: '' } });
            }
        };
    }

    angular
        .module('Kaakateeya')
        .factory('editOfcePurposeService', factory);

    factory.$inject = ['$http'];
})(angular);