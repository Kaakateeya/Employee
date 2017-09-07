(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('unAssignedPhotosModel', factory);

    factory.$inject = ['unAssignedPhotosService', 'alert'];

    function factory(unAssignedPhotosService, alertss) {

        var model = {};
        model.scope = {};

        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'dd-mm-yy'
        };
        model.inpucheckboxTemplate = function(row) {
            return "<md-checkbox type='checkbox' ng-model='model.chkval" + row.index + "' ng-change='model.checkchange(model.chkval" + row.index + "," + JSON.stringify(row.ProfileID) + ");'>";
        };
        model.assignPhoto = function() {
            var strphotoIDs = [];
            var checkedArray = _.where(model.data, { chk: true });
            _.each(checkedArray, function(item) {
                strphotoIDs.push(item.IdS);
            });
            if (checkedArray.length > 0 && model.AssignEmp) {
                unAssignedPhotosService.AssignPhoto(model.AssignEmp, strphotoIDs.join(',')).then(function(response) {
                    if (response.data && parseInt(response.data) === 1) {
                        model.data = _.difference(model.data, checkedArray);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Photo assigned successfully', 4500);
                    }
                });
            } else {
                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please check profile and select Assigned Employee', 4500);
            }

        };

        model.checkAll = function(val) {
            if (val === true) {
                _.map(model.data, function(item) {
                    item.chk = true;
                    model['chkval' + item.index] = true;
                });
            } else {
                _.map(model.data, function(item) {
                    item.chk = false;
                    model['chkval' + item.index] = false;
                });
            }
        };

        model.checkchange = function(val, profileid) {

            if (val === true) {
                _.map(model.data, function(item) {
                    if (item.ProfileID === profileid)
                        item.chk = true;
                });
            } else {
                _.map(model.data, function(item) {
                    if (item.ProfileID === profileid)
                        item.chk = false;
                });
            }
        };
        model.ProfileIdTemplateDUrl = function(row) {
            var paidstatusclass = row.paid === 372 ? 'paidclass' : 'unpaid';
            var paid = "<a style='cursor:pointer;'  class=" + paidstatusclass + " href='javascript:void(0);'  ng-click='model.viewprofile(" + JSON.stringify(row.ProfileID) + ")' >" + row.ProfileID + "</a>";
            return paid;
        };
        model.viewprofile = function(ToProfileID) {
            window.open('/Viewfullprofile/' + ToProfileID + '/0', '_blank');
        };
        model.getUnassigndata = function() {

            model.columns = [
                { text: '', key: '', type: 'morelinks', templateUrl: model.inpucheckboxTemplate },
                { text: 'ProfileID', key: 'ProfileID', type: 'morelinks', templateUrl: model.ProfileIdTemplateDUrl },
                { text: 'CustomerName', key: 'CustomerName', type: 'label' },
                { text: 'OwnerName', key: 'OwnerName', type: 'label' },
                { text: 'PhotosCount', key: 'PhotosCount', type: 'label' }
            ];
            debugger;
            var inobj = {
                iEmpID: model.empid,
                StrProfileID: model.profileID ? model.profileID : null,
                PhotoAssigned: model.photoAssigned,
                GenderID: null,
                PhotoStatus: '1',
                strBranch: model.branch.length > 0 ? model.branch.join(',') : null,
                strRegion: model.region.length > 0 ? model.region.join(',') : null,
                strCaste: model.caste.length > 0 ? model.caste.join(',') : null,
                StartDate: model.uploadedFrom ? moment(model.uploadedFrom).format('YYYY-MM-DD hh:mm:ss') : null,
                EnDate: model.uploadedTo ? moment(model.uploadedTo).format('YYYY-MM-DD hh:mm:ss') : null,
                intlowerBound: 1,
                intUpperBound: 500
            };
            unAssignedPhotosService.getUnassignPhotoSelect(inobj).then(function(response) {
                model.isDisabledsubmit = false;
                if (response.data && response.data.length > 0) {

                    model.totalRecords = response.data[0].TotalRows;
                    model.data = response.data;
                    _.map(model.data, function(item, index) {
                        item.chk = false;
                        item.index = index;
                    });
                } else {
                    model.opendiv = true;
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No records found', 4500);
                    model.data = [];
                }
            });

        };
        model.reset = function() {
            model.photoAssigned = '0';
            model.profileID = '';
            model.caste = '';
            model.region = '';
            model.uploadedFrom = '';
            model.uploadedTo = '';
            model.branch = '';
            model.AssignEmp = '';
            model.isDisabledsubmit = false;
        };

        return model;

    }
})();