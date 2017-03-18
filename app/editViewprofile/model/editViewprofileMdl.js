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
                    debugger;
                    // _.each(response.data[0], function(item) {
                    //     var testArr = JSON.parse(item);
                    //     model.tablearray.push(testArr);
                    // });
                    // model.tablearray.push(JSON.parse(response.data[0]));
                    model.scope.$broadcast('submittable', JSON.parse(response.data[0]));

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