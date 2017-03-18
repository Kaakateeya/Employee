(function(angular) {
    'use strict';


    function factory($http, ViewAllCustomerService) {

        var model = {};
        model.tablearray = [];
        model.ViewAllsubmit = function(inpuobj) {

            ViewAllCustomerService.getViewCustomerData(2, inpuobj.ProfileIDsearch, 54).then(function(response) {

                console.log(response);
                console.log(JSON.parse(response.data[0]));

                if (response.data !== undefined && response.data !== "" && response.data !== null) {


                    model.scope.$broadcast('submittable', JSON.parse(response.data[0]), 1);

                }
            });
            return model;
        };
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('editViewprofileModel', factory);
    factory.$inject = ['$http', 'editViewprofileservice'];
})(angular);