(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('listOFServuceTakenModel', factory);

    factory.$inject = ['listOFServuceTakenService', 'helperservice', '$timeout', 'alert'];

    function factory(listOFServuceTakenService, helpService, timeout, alertss) {

        var model = {};
        model.grid1 = {};
        model.scope = {};
        model.grid1.showsearchrows = true;
        model.grid1.showsearch = true;
        model.grid1.showpaging = true;
        model.grid1.myprofileexcel = true;
        model.grid1.normalexcel = true;
        model.profileOwner = [];
        model.applicationStatusarray = [];
        model.Castearray = [];
        model.ProfileOwnerarray = [];
        model.Brancharray = [];
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'mm-dd-yy'
        };

        model.MyProfilePageLoad = function() {
            if (model.applicationStatusarray.length === 0) {
                helpService.getMyprofilebind(1, 2, '').then(function(response) {

                    _.each(response.data, function(item) {
                        switch (item.CountryCode) {
                            case "Application Status":
                                model.applicationStatusarray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                            case "Caste":
                                model.Castearray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                            case "Profile Owner":
                                model.ProfileOwnerarray.push({ "label": item.Name, "title": item.Name, "value": item.ID, "display": item.Name });
                                break;
                            case "Branch":
                                model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                        }
                    });
                });
            }
        };
        model.MyProfilePageLoad();

        model.joinArray = function(val) {
            var str = null;
            if (val && val.length > 0) {
                str = val.join(',');
            }
            return str;
        };

        model.returnProfileIDTemplate = function(profileid, paidStatus) {
            var paidstatusclass = paidStatus === 1 ? 'paidclass' : 'unpaid';
            var paid = "<a class='" + paidstatusclass + "' href='javascript:void(0);' ng-click='model.viewProfile(" + JSON.stringify(profileid) + ");'>" + profileid + "</a>";
            return paid;
        };

        model.viewProfile = model.grid1.viewProfile = function(ProfileID) {
            window.open('/Viewfullprofile/' + ProfileID + '/0', '_blank');
        };

        model.fromProfileid = function(row) {
            return model.returnProfileIDTemplate(row.ReceipentName, 0);
        };

        model.toProfileid = function(row) {
            return model.returnProfileIDTemplate(row.SenderName, 0);
        };

        model.grid1.pagechange = function(val) {
            model.getServiceGivenProfiles(val);
        };
        model.getServiceGivenProfiles = function(to) {

            model.grid1.columns = [
                { text: 'Sno', key: 'sno', type: 'label' },
                { text: 'From profile ID', key: 'ReceipentName', type: 'morelinks', templateUrl: model.fromProfileid },
                { text: 'To profile ID', key: 'SenderName', type: 'morelinks', templateUrl: model.toProfileid },
                { text: 'From Name', key: 'ReceipentProfileidname', type: 'label' },
                { text: 'To Name', key: 'Senderprofileidname', type: 'label' },
                { text: 'Service date', key: 'ServiceDate', type: 'label' },
                { text: 'Service given by', key: 'AssignedEmp', type: 'label' },
                { text: 'Branch', key: 'BranchesName', type: 'label' }
            ];

            var obj = {
                AppUserId: model.aaa,
                intlowerBound: 1,
                intUpperBound: 100,
                PageSize: 100,
                PageNumber: to,
                flag: model.aaa,
                strApplicationStatus: model.joinArray(model.applicationStatus),
                strCaste: model.joinArray(model.caste),
                strBranch: model.joinArray(model.branch),
                strOwneroftheProfile: model.joinArray(model.profileOwner),
                strservicetakeby: model.joinArray(model.serviceGivenEmp),
                IsConfidential: model.confidential === true ? 1 : 0,
                ServiceTakenFromDate: model.fromDate ? moment(model.fromDate).format('MM-DD-YYYY') : null,
                ServiceTakenToDate: model.toDate ? moment(model.toDate).format('MM-DD-YYYY') : null,
                StartIndex: null,
                EndIndex: null,
                ResultFlag: null
            };

            listOFServuceTakenService.listOFServiceGiven(obj).then(function(response) {
                if ((response.data[0]).length > 0) {
                    model.opendiv = false;
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

        model.reset = function() {
            model.applicationStatus = [54];
            model.caste = [402];
            timeout(function() {
                model.branch = [319, 320, 321, 322, 323, 324, 325, 326, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344];
                _.each(model.ProfileOwnerarray, function(item) {
                    model.profileOwner.push(parseInt(item.value));
                });
            }, 1000);

            model.fromDate = moment().subtract(1, 'days').format('MM-DD-YYYY');
            model.toDate = moment().format('MM-DD-YYYY');
            model.serviceGivenEmp = '';
            model.confidential = '';
        };

        model.grid1.exportexcel = function(topage) {
            model.exportarray = [];
            model.exportarray = model.excelData;
            var options = {
                headers: true
            };
            alasql('SELECT ReceipentName as fromProfileID,SenderName as toprofileID,ReceipentProfileidname as fromName,Senderprofileidname as toname,PhotoGreade,ServiceDate,AssignedEmp as servicegivenby,BranchesName as branch INTO  XLSX("Reports.xlsx",?) FROM ?', [options, model.exportarray]);
        };

        return model;
    }
})();