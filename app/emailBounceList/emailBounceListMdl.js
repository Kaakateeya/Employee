(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('emailBounceListModel', factory);

    factory.$inject = ['emailBounceListService', 'helperservice', 'alert', '$timeout', 'Commondependency'];

    function factory(emailBounceListService, helpService, alertss, timeout, Commondependency) {
        var model = {};
        model.grid1 = {};
        model.scope = {};
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'dd-mm-yy'
        };

        model.applicationStatusarray = [];
        // model.Castearray = [];
        model.ProfileOwnerarray = [];
        model.Brancharray = [];

        model.MyProfilePageLoad = function() {
            if (model.ProfileOwnerarray.length === 0) {
                helpService.getMyprofilebind(1, 2, '').then(function(response) {
                    _.each(response.data, function(item) {
                        switch (item.CountryCode) {
                            // case "Application Status":
                            //     model.applicationStatusarray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            //     break;
                            // case "Caste":
                            //     model.Castearray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            //     break;
                            case "Profile Owner":
                                model.ProfileOwnerarray.push({ "label": item.Name, "title": item.Name, "value": item.ID, "display": item.Name });
                                break;
                            case "Branch":
                                model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                model.branch = [];
                                break;
                        }
                    });
                });
            }
        };
        model.reset = function() {
            model.createdToDate = moment().format('MM-DD-YYYY');
            // model.modifiedToDate = moment().format('MM-DD-YYYY');
            // model.caste = [402];
            model.applicationStatus = true;
            model.ProfileOwner = [];
            model.modifiedBy = [];
            timeout(function() {
                model.branch = [319, 320, 321, 322, 323, 324, 325, 326, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344];
                // _.each(model.ProfileOwnerarray, function(item) {
                //     model.ProfileOwner.push(parseInt(item.value));
                //     // model.modifiedBy.push(parseInt(item.value));
                // });
            }, 1000);

            model.rbtnGender = '';
            model.confidential = '';
            model.profileid = '';
            model.Email = '';
            model.createdFromDate = '';
            model.branch = null;
            model.ProfileOwner = null;
            // model.modifiedFromDate = '';
        };

        model.joinArray = function(val) {
            var str = null;
            if (val && val.length > 0) {
                str = val.join(',');
            }
            return str;
        };
        model.returnProfileIDTemplate = function(row) {
            var paidstatusclass = row.IsPaidMember === 372 ? 'paidclass' : 'unpaid';
            var paid = "<a class='" + paidstatusclass + "' href='javascript:void(0);' ng-click='model.ViewProfile(" + JSON.stringify(row.ProfileId) + ");'>" + row.ProfileId + "</a>";
            return paid;
        };
        model.grid1.ViewProfile = function(ProfileID) {
            window.open('/Viewfullprofile/' + ProfileID + '/0', '_blank');
        };


        model.geBouncedMailsList = function(to) {

            model.grid1.columns = [
                { text: 'Sno', key: 'sno', type: 'label' },
                { text: 'ProfileID', key: 'ProfileId', type: 'morelinks', templateUrl: model.returnProfileIDTemplate },
                { text: 'Name', key: 'Name', type: 'label' },
                { text: 'Old email id', key: 'EmailId', type: 'label' },
                { text: 'Modified email id', key: 'ModifiedEmailId', type: 'label' },
                { text: 'Relation name', key: 'RealtionName', type: 'label' },
                { text: 'Created by', key: 'CreatedBy', type: 'label' },
                { text: 'Created date', key: 'CreatedDate', type: 'label' },
                { text: 'Modified by', key: 'ModifiedBy', type: 'label' },
                { text: 'Modified date', key: 'ModifiedDate', type: 'label' },
            ];

            model.grid1.showsearchrows = true;
            model.grid1.showsearch = true;
            model.grid1.myprofileexcel = true;
            model.grid1.normalexcel = true;

            var obj = {
                strProfileID: model.profileid ? model.profileid : null,
                BouncedEmail: model.Email ? model.Email : null,
                strAppllicationStatus: model.applicationStatus === true ? '54' : null,
                isConfidential: model.confidential === true ? 1 : 0,
                strCaste: null,
                strBranch: model.joinArray(model.branch),
                strOwnerOfProfile: model.joinArray(model.ProfileOwner),
                strRegion: model.joinArray(model.Region),
                StartDate: model.createdFromDate ? moment(model.createdFromDate).format('MM-DD-YYYY') : null,
                EndDate: model.createdToDate ? moment(model.createdToDate).format('MM-DD-YYYY') : null,
                strModifiedBy: null,
                ModifiedStartDate: null,
                ModifiedEndDate: null,
                GenderID: model.rbtnGender,
                rangeFrom: null,
                rangeTo: null,
                PageSize: 100,
                PageNumber: to,
                flag: 0
            };
            emailBounceListService.getEmailsBouncedList(obj).then(function(response) {
                if ((response.data[0]).length > 0) {
                    model.grid1.showpaging = true;
                    model.panelbodyhide = false;
                    model.grid1.TotalRows = (response.data[1])[0].TotalRows;
                    model.grid1.data = (response.data[0]);
                    var i = 1;
                    model.excelData = (response.data[0]);
                    _.map((response.data[0]), function(item) {
                        if (to === 1) {
                            item.sno = i;
                            i++;
                        } else {
                            item.sno = to * 100 + i;
                            i++;
                        }
                    });

                } else {
                    if (to === 1) {
                        model.excelData = model.grid1.data = [];
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No records found', 3500);
                    }
                }
            });
        };

        model.grid1.pagechange = function(val) {
            model.geBouncedMailsList(val);
        };

        model.grid1.exportexcel = function(topage) {
            model.exportarray = [];
            model.exportarray = model.excelData;
            var options = {
                headers: true
            };
            alasql('SELECT ProfileId,Name,EmailId as oldEmailID,ModifiedEmailId,RealtionName,CreatedBy,CreatedDate,ModifiedBy,ModifiedDate INTO  XLSX("Reports.xlsx",?) FROM ?', [options, model.exportarray]);
            // model.getNogradingprofiles(parseInt(topage / 100), 'excel');
        };

        model.regionChange = function(parent) {
            model.Brancharray = [];
            model.Brancharray = Commondependency.branch(model.joinArray(parent));
        };


        return model;

    }
})();