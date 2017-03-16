(function(angular) {
    'use strict';

    function factory($http, ViewAllCustomerService, state) {
        var model = {};
        model.scope = {};
        model.obj = {};
        model.arr = [{ Name: 'asdsada', ProfileID: '222222' }, { Name: 'asdsada', ProfileID: '222222' }, { Name: 'asdsada', ProfileID: '222222' }, { Name: 'asdsada', ProfileID: '222222' }, { Name: 'asdsada', ProfileID: '222222' }, { Name: 'asdsada', ProfileID: '222222' }];
        model.ViewAllsubmit = function(inpuobj) {

            ViewAllCustomerService.getViewCustomerData(2, inpuobj.ProfileIDsearch, 54).then(function(response) {
                console.log(response);
                console.log(JSON.parse(response.data[0]));

                if (response.data !== undefined && response.data !== "" && response.data !== null) {
                    model.scope.$broadcast('submittable', JSON.parse(response.data[0]));
                }
            });
            return model;
        };


        model.kmplSubmit = function(inpuobj) {
            ViewAllCustomerService.kmplprofileIDData(2, inpuobj.KmlProfileID).then(function(response) {
                console.log(response);
                console.log(JSON.parse(response.data[0]));
                if (response.data !== undefined && response.data !== "" && response.data !== null) {
                    model.scope.$broadcast('submittable', JSON.parse(response.data[0]));
                }
            });
            return model;
        };

        model.editLink = function(custid) {

            state.go("/", {});
        };
        model.redirectEdit = function(Custid) {
            alert(11111);
            $state.go("editview.editEducation", { CustID: Custid });
            //  window.location = "/" + type + "/" + stateParams.CustID;
        };

        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('ViewAllCustomerModel', factory);
    factory.$inject = ['$http', 'ViewAllCustomerService', '$state'];
})(angular);