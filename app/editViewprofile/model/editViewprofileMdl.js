(function(angular) {
    'use strict';

    function factory($http, ViewAllCustomerService, state, helpService, config, alerts, modelpopupopenmethod, authSvc, configslide) {
        var model = {};
        var modelinactive = {};
        model = config;
        model.slide = configslide;
        model.showplus = true;
        model.tablearray = [];
        model.obj = {};
        model.obj.rdnGender = '3';
        model.opendiv = true;
        model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        model.totalrowsshow = false;
        model.showsearchrows = false;
        model.showsearch = true;
        model.showpaging = true;
        model.myprofileexcel = false;
        model.normalexcel = false;
        model.slide.templateUrl = "templates/myprofileSlide.html";
        model.slide.headettemp = "myprofileheader.html";
        model.init = function() {
            modelinactive = {};
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

        model.ProfileOwnerImg = function(row) {
            var img = row.ProfileStatusID === 57 || row.ProfileStatusID === 393 ? 'src/images/settleimage_new.png' : (row.ProfileStatusID === 56 || row.ProfileStatusID === 394 ? 'src/images/deleteimage.png' : (row.ProfileStatusID === 55 ? 'src/images/imgInActive.png' : ''));
            var dd = img !== '' ? img : '';
            var paid = "<span class='red'>" + row.ProfileOwner + "</span> " + (img !== "" ? "<img class='profileImage'  src=" + img + "></img>" : '');
            return paid;
        };

        model.profileownerMethod = function(row) {
            var type = row.ProfileStatusID === 57 || row.ProfileStatusID === 393 ? 'S' : (row.ProfileStatusID === 56 || row.ProfileStatusID === 394 ? 'D' : (row.ProfileStatusID === 55 ? 'I' : ''));
            ViewAllCustomerService.SettleDeleteInactive(row.CustID, type).then(function(response) {
                model.settleArr = JSON.parse(response.data[0])[0];
                model.typeOfProfile = type;
            });

            modelpopupopenmethod.showPopup('settlePopup.html', model.scope, 'lg', 'SettleDelete');
        };
        model.closepopup = function() {
            modelpopupopenmethod.closepopup();
        };
        model.rowStyle = function(row) {
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
        model.GenderStr = function(row) {
            return row.GenderID === 1 ? 'Male' : 'Female';
        };

        model.ViewAllsubmit = function(inpuobj, from, to, typeofbind) {

            model.columns = [
                { text: 'Profile ID', key: 'ProfileID', type: 'custom', templateUrl: model.ProfileIdTemplateDUrl, rowtype: "success" },
                { text: 'SurName', key: 'LastName', type: 'label' },
                { text: 'Name', key: 'FirstName', type: 'label' },
                { text: 'Caste', key: 'CasteName', type: 'label' },
                { text: 'Profile Owner', key: 'ProfileOwner', type: 'customlink', templateUrl: model.ProfileOwnerImg, method: model.profileownerMethod },
                { text: 'Height', key: 'Height', type: 'label' },
                { text: 'Login', key: 'LoginStatus', type: 'label' },
                { text: 'Education', key: 'educationgroup', type: 'label' },
                { text: 'Profession', key: 'Profession', type: 'label' },
                { text: 'Dob', key: 'Age', type: 'label', width: '150px' },
                { text: 'Gender', key: 'GenderID', type: 'custom', templateUrl: model.GenderStr },
            ];

            var obj = {
                strFName: inpuobj.Name !== undefined ? inpuobj.Name : "",
                strSurName: inpuobj.surname !== undefined ? inpuobj.surname : "",
                strProfileID: inpuobj.ProfileIDsearch !== undefined ? inpuobj.ProfileIDsearch : "",
                strKMMLID: inpuobj.KmlProfileID !== undefined ? inpuobj.KmlProfileID : "",
                profileStatus: inpuobj.chkProfileIDsts !== undefined ? model.returnnullvalue(inpuobj.chkProfileIDsts) : "",
                intStartIndex: from,
                intEndIndex: to,
                intEmpID: model.empid
            };

            ViewAllCustomerService.getViewCustomerData(obj).then(function(response) {
                if (_.isArray(response.data) && response.data.length > 0) {
                    model.TotalRows = response.data[0].TotalRows;
                    model.totalrowsshow = true;
                    _.map(response.data, function(item) {
                        item.rowtype = model.rowStyle(item);
                    });
                    // model.opendiv = false;
                    if (typeofbind === "export") {
                        model.exportarray = [];
                        model.exportarray = response.data;
                        var options = {
                            headers: true,
                        };
                        alasql('SELECT ProfileID,FirstName,LastName as SurName,CasteName as Caste,ProfileOwner,Height,LoginStatus as Loagin,educationgroup as Education,Profession,Age as DOB,GenderID as Gender INTO  XLSX("john.xlsx",?) FROM ?', [options, model.exportarray]);
                    } else {
                        model.setData(response.data);
                    }
                } else {
                    if (from === parseInt(1)) {
                        model.data = [];
                    }
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
            model.ViewAllsubmit(model.obj, 1, 10);
        };

        model.genderChange = function(val) {
            if (model.gridArray.length > 0 && val !== undefined && val !== '' && val !== null) {
                var arr = val === 3 || val === '3' ? model.gridArray : _.where(model.gridArray, { GenderID: parseInt(val) });
                model.scope.$broadcast('submittable', arr, 1);
            }
        };

        model.pagechange = function(val) {
            model.columns = [
                { text: 'Profile ID', key: 'ProfileID', type: 'custom', templateUrl: model.ProfileIdTemplateDUrl, rowtype: "success" },
                { text: 'SurName', key: 'LastName', type: 'label' },
                { text: 'Name', key: 'FirstName', type: 'label' },
                { text: 'Caste', key: 'CasteName', type: 'label' },
                { text: 'Profile Owner', key: 'ProfileOwner', type: 'customlink', templateUrl: model.ProfileOwnerImg, method: model.profileownerMethod },
                { text: 'Height', key: 'Height', type: 'label' },
                { text: 'Login', key: 'LoginStatus', type: 'label' },
                { text: 'Education', key: 'educationgroup', type: 'label' },
                { text: 'Profession', key: 'Profession', type: 'label' },
                { text: 'Dob', key: 'Age', type: 'label', width: '150px' },
                { text: 'Gender', key: 'GenderID', type: 'custom', templateUrl: model.GenderStr },
            ];
            var to = val * 10;
            var from = val === 1 ? 1 : to - 9;
            model.ViewAllsubmit(model.obj, from, to);
        };
        model.exportexcel = function(array, columns) {
            model.ViewAllsubmit(model.obj, 1, model.TotalRows, "export");
            // var cloumsarr = [];
            // var selectarray = [];
            // _.each(_.filter(columns, function(item) { return item.key !== "" && item.key !== undefined; }), function(inneritem) {
            //     cloumsarr.push({ columnid: inneritem.key, title: inneritem.text });
            // });
            // var options = {
            //     headers: true,
            //     columns: cloumsarr
            // };
            // var join = _.map(cloumsarr, 'columnid').join(',');
            // var select = 'SELECT ' + join + ' INTO  XLSX("john.xlsx",?) FROM ?';
            // alasql(select, [options, array]);
        };
        return model.init();
    }
    angular
        .module('Kaakateeya')
        .factory('editViewprofileModel', factory);
    factory.$inject = ['$http', 'editViewprofileservice', '$state', 'helperservice', 'complex-grid-config', 'alert', 'modelpopupopenmethod', 'authSvc', 'complex-slide-config'];
})(angular);