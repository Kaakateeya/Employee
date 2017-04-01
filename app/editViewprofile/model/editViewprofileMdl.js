(function(angular) {
    'use strict';


    function factory($http, ViewAllCustomerService, state, helpService, config) {

        var model = {};
        model = config;
        model.tablearray = [];
        model.obj = {};
        model.obj.rdnGender = '3';
        model.opendiv = true;
        model.init = function() {
            // model.grid = config;
            return model;
        };

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

        model.ProfileIdTemplateDUrl = function(row) {
            var paid = "<a style='cursor:pointer;'  href='/Education/" + row.CustID + "'>" + row.ProfileID + row.Confidential + "</a>";
            return paid;
        };

        model.ViewAllsubmit = function(inpuobj) {
            model.columns = [
                { text: 'ProfileID', key: 'ProfileID', type: 'custom', templateUrl: model.ProfileIdTemplateDUrl },
                { text: 'Last Name', key: 'LastName', type: 'label' },
                { text: 'First Name', key: 'FirstName', type: 'label' },
                { text: 'Caste', key: 'CasteName', type: 'label' },
                { text: 'ProfileOwner', key: 'ProfileOwner', type: 'label' },
                { text: 'Height', key: 'Height', type: 'label' },
                { text: 'Login', key: 'LoginStatus', type: 'label' },
                { text: 'Education', key: 'educationgroup', type: 'label' },
                { text: 'Profession', key: 'Profession', type: 'label' },
                { text: 'DOB', key: 'Age', type: 'label', width: '150px' },
                { text: 'CustID', key: 'CustID', type: 'label' },
                { text: 'GenderID', key: 'GenderID', type: 'label' },
                { text: 'ProfileStatusID', key: 'ProfileStatusID', type: 'label' },
                { text: 'Confidential', key: 'Confidential', type: 'label' }
            ];

            ViewAllCustomerService.getViewCustomerData(2, (inpuobj !== undefined && inpuobj.ProfileIDsearch !== undefined ? inpuobj.ProfileIDsearch : ''), (inpuobj !== undefined && inpuobj.chkProfileIDsts !== undefined ? model.returnnullvalue(inpuobj.chkProfileIDsts) : "")).then(function(response) {
                console.log(response.data);
                if (_.isArray(response.data)) {
                    model.opendiv = false;
                    model.setData(response.data);
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

        model.pagechange = function(val) {
            alert(val);

            var to = val * 10;
            var from = val === 1 ? 1 : to - 9;
            debugger;
            ViewAllCustomerService.getViewCustomerData(2, (model.obj !== undefined && model.obj.ProfileIDsearch !== undefined ? model.obj.ProfileIDsearch : ''), (model.obj !== undefined && model.obj.chkProfileIDsts !== undefined ? model.returnnullvalue(model.obj.chkProfileIDsts) : "")).then(function(response) {
                console.log(response.data);
                if (_.isArray(response.data)) {
                    model.opendiv = false;
                    model.appendData(response.data);
                }

            });
        }

        model.chkChange = function() {
            model.ViewAllsubmit(model.obj);
        };

        model.genderChange = function(val) {

            if (model.gridArray.length > 0 && val !== undefined && val !== '' && val !== null) {
                var arr = val === 3 || val === '3' ? model.gridArray : _.where(model.gridArray, { GenderID: parseInt(val) });
                model.scope.$broadcast('submittable', arr, 1);
            }

        };
        return model.init();
    }
    angular
        .module('Kaakateeya')
        .factory('editViewprofileModel', factory);
    factory.$inject = ['$http', 'editViewprofileservice', '$state', 'helperservice', 'complex-grid-config'];
})(angular);