(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getPhotoData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/GetphotosofCustomer', { params: { Custid: obj, EmpID: 2 } });
            },
            submituploadData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/Savephotosofcustomer', JSON.stringify(obj1));
            },
            linqSubmits: function(Custid, iflag) {
                return http.get(app.apiroot + 'CustomerPersonalUpdate/getPhotoPassword', { params: { CustID: Custid, ipassword: iflag } });
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('editManagePhotoService', factory);

    factory.$inject = ['$http'];
})(angular);