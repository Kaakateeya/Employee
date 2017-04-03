(function(angular) {
    'use strict';


    function factory($http, ViewAllCustomerService, state, helpService, config) {

        var model = {};
        model = config;
        model.tablearray = [];
        model.obj = {};
        model.obj.rdnGender = '3';
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
        // model.ViewAllsubmit = function(inpuobj) {
        //     debugger;
        //     ViewAllCustomerService.getViewCustomerData(2, (inpuobj !== undefined && inpuobj.ProfileIDsearch !== undefined ? inpuobj.ProfileIDsearch : ''), (inpuobj !== undefined && inpuobj.chkProfileIDsts !== undefined ? model.returnnullvalue(inpuobj.chkProfileIDsts) : "")).then(function(response) {

        //         model.gridArray = [];
        //         if (response.data !== undefined && response.data !== "" && response.data !== null && response.data.length > 0) {
        //             model.opendiv = false;

        //             console.log(JSON.parse(response.data[0]));
        //             _.map(JSON.parse(response.data[0]), function(item) {

        //                 model.gridArray.push({
        //                     'ProfileID': item.ProfileID,
        //                     'Last Name': item.FirstName,
        //                     'First Name': item.LastName,
        //                     'Caste': item.CasteName,
        //                     'ProfileOwner': item.ProfileOwner,
        //                     'Height': item.Height,
        //                     'Login': item.LoginStatus,
        //                     'Education': item.educationgroup,
        //                     'Profession': item.Profession,
        //                     'DOB': item.Age,
        //                     'CustID': item.CustID,
        //                     'GenderID': item.GenderID,
        //                     'ProfileStatusID': item.ProfileStatusID,
        //                     'Confidential': item.Confidential
        //                 });
        //             });

        //             model.scope.$broadcast('submittable', model.gridArray, 1);
        //         }
        //     });
        //     return model;
        // };


        model.ProfileIdTemplateDUrl = function(row) {
            var paid = "<a style='cursor:pointer;'  href='/Education/" + row.CustID + "'>" + row.ProfileID + row.Confidential + "</a>";
            return paid;
        };
        model.ProfileOwnerImg = function(row) {
            var img = row.ProfileStatusID === 57 || row.ProfileStatusID === 393 ? 'src/images/settleimage_new.png' : (row.ProfileStatusID === 56 || row.ProfileStatusID === 394 ? 'src/images/deleteimage.png' : (row.ProfileStatusID === 55 ? 'src/images/imgInActive.png' : ''));
            var paid = "<span style='color:red;'>" + row.ProfileOwner + "</span><img style='cursor:pointer;' src=" + img + "></img>";
            return paid;
        };

        model.rowStyle = function(row) {
            debugger;
            var classes = ['settled', 'Deleted', 'inactive'];
            // alert(row.ProfileStatusID);
            var test = [
                { StatusID: 57, classes: 'settled' },
                { StatusID: 393, classes: 'settled' },
                { StatusID: 56, classes: 'Deleted' },
                { StatusID: 394, classes: 'Deleted' },
                { StatusID: 55, classes: 'inactive' }
            ];

            return _.where(test, { StatusID: row.ProfileStatusID }).length > 0 ? _.where(test, { StatusID: row.ProfileStatusID })[0].classes : ''

        }

        model.ViewAllsubmit = function(inpuobj) {
            model.columns = [
                { text: 'ProfileID', key: 'ProfileID', type: 'custom', templateUrl: model.ProfileIdTemplateDUrl, rowtype: "success" },
                { text: 'Last Name', key: 'LastName', type: 'label' },
                { text: 'First Name', key: 'FirstName', type: 'label' },
                { text: 'Caste', key: 'CasteName', type: 'label' },
                { text: 'ProfileOwner', key: 'ProfileOwner', type: 'custom', templateUrl: model.ProfileOwnerImg },
                { text: 'Height', key: 'Height', type: 'label' },
                { text: 'Login', key: 'LoginStatus', type: 'label' },
                { text: 'Education', key: 'educationgroup', type: 'label' },
                { text: 'Profession', key: 'Profession', type: 'label' },
                { text: 'DOB', key: 'Age', type: 'label', width: '150px' },
                { text: 'GenderID', key: 'GenderID', type: 'label' },
                { text: 'Confidential', key: 'Confidential', type: 'label' }
            ];

            ViewAllCustomerService.getViewCustomerData(2, (inpuobj !== undefined && inpuobj.ProfileIDsearch !== undefined ? inpuobj.ProfileIDsearch : ''), (inpuobj !== undefined && inpuobj.chkProfileIDsts !== undefined ? model.returnnullvalue(inpuobj.chkProfileIDsts) : "")).then(function(response) {
                console.log(response.data);
                debugger;
                if (_.isArray(response.data)) {

                    _.map(response.data, function(item) {
                        item.rowtype = model.rowStyle(item);
                    });

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

            $state.go("editview.editEducation", { CustID: Custid });
        };

        model.chkChange = function() {
            model.ViewAllsubmit(model.obj);
        };

        model.genderChange = function(val) {

            if (model.gridArray.length > 0 && val !== undefined && val !== '' && val !== null) {
                var arr = val === 3 || val === '3' ? model.gridArray : _.where(model.gridArray, { GenderID: parseInt(val) });
                model.scope.$broadcast('submittable', arr, 1);
            }

        };
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('editViewprofileModel', factory);
    factory.$inject = ['$http', 'editViewprofileservice', '$state', 'helperservice', 'complex-grid-config'];
})(angular);