(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getAstroData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getAstroDetailsDisplay', { params: { CustID: obj } });
            },
            submitAstroData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerAstrodetailsUpdatedetails', JSON.stringify(obj1));
            },
            uploadDeleteAstroData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/AstroDetailsUpdateDelete', JSON.stringify(obj1));
            },
            generateHoroscope: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonalUpdate/getGenerateHoroscorpe', { params: { customerid: obj.customerid, EmpIDQueryString: obj.EmpIDQueryString, intDay: obj.intDay, intMonth: obj.intMonth, intYear: obj.intYear, CityID: obj.CityID } });
            },

            GenerateHoroS3: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonalUpdate/getAstroGenerationS3Update', { params: { Path: (obj.Path), KeyName: (obj.KeyName) } });
            }

        };
    }

    angular
        .module('Kaakateeya')
        .factory('editAstroService', factory);

    factory.$inject = ['$http'];
})(angular);