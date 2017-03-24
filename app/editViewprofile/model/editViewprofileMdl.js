(function(angular) {
    'use strict';


    function factory($http, ViewAllCustomerService, state, helpService) {

        var model = {};
        model.tablearray = [];
        model.obj = {};
        model.obj.myVar = '3';
        model.opendiv = true;

        model.profileidstatus = [
            { value: 54, name: 'Active' },
            { value: 57, name: 'Settled' },
            { value: 56, name: 'Deleted' },
            { value: 55, name: 'Inactive' }
        ];
        model.arrayToString = function(string) {
            return string !== null ? (string.split(',')).map(Number) : null;
        };

        model.obj.chkProfileIDsts = model.arrayToString('54');
        model.returnnullvalue = function(value) {
            var obj = helpService.checkstringvalue(value) && (value.toString()) !== "0" && (value.toString()) !== 0 ? (value.toString()) : null;
            return obj;
        };
        model.ViewAllsubmit = function(inpuobj) {
            ViewAllCustomerService.getViewCustomerData(2, (inpuobj !== undefined && inpuobj.ProfileIDsearch !== undefined ? inpuobj.ProfileIDsearch : ''), (inpuobj !== undefined && inpuobj.chkProfileIDsts !== undefined ? model.returnnullvalue(inpuobj.chkProfileIDsts) : "")).then(function(response) {
                console.log(response);
                var gridArray = [];
                if (response.data !== undefined && response.data !== "" && response.data !== null && response.data.length > 0) {
                    model.opendiv = false;

                    _.map(JSON.parse(response.data[0]), function(item) {
                        gridArray.push({
                            'ProfileID': item.ProfileID,
                            'Last Name': item.FirstName,
                            'First Name': item.LastName,
                            'Caste': item.CasteName,
                            'Profile Owner': item.ProfileOwner,
                            'Height': item.Height,
                            'Login': item.LoginStatus,
                            'Education': item.educationgroup,
                            'Profession': item.Profession,
                            'DOB': item.Age,
                            'CustID': item.CustID
                        });
                    });

                    model.scope.$broadcast('submittable', gridArray, 1);
                }
            });
            return model;
        };
        model.kmplSubmit = function(inpuobj) {
            ViewAllCustomerService.kmplprofileIDData(2, (inpuobj !== undefined && inpuobj.KmlProfileID !== undefined ? inpuobj.KmlProfileID : '')).then(function(response) {

                if (response.data !== undefined && response.data !== "" && response.data !== null && response.data.length > 0) {
                    model.opendiv = false;
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
        };

        model.testvalll = function() {
            alert(11111);
        };
        model.subtabledata = function() {
            editViewprofileservice.playbtnProfileData().then(function(response) {
                console.log(response);
            });

        };
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('editViewprofileModel', factory);
    factory.$inject = ['$http', 'editViewprofileservice', '$state', 'helperservice'];
})(angular);