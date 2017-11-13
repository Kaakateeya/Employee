(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('settleDeleteProfileseReportModel', factory);

    factory.$inject = ['settleDeleteProfileseReportService', 'Commondependency', 'single-grid-config', 'modelpopupopenmethod', 'alert', 'SelectBindServiceApp'];

    function factory(settleDeleteProfileseReportService, Commondependency, config, modelpopupopenmethod, alertss, SelectBindServiceApp) {

        var model = {},
            restoreCustID;
        model.grid1 = {};
        model.grid2 = {};
        model.scope = {};
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'mm-dd-yy'
        };

        model.reset = function() {
            model.panelbodyhide = true;
            model.branchArr = Commondependency.branch('');
            model.branch = '';
            model.rbtnsettleDeleteType = '0';
            model.rbtntypeofProfile = '0';
            model.rbtGender = '0';
            model.profileID = '';
            model.region = '';
            model.profileOwner = '';
            model.caste = '';
            model.settledeleteby = '';
            model.authorizedby = '';
            model.chkConfidential = '';

            var date = moment().subtract(1, 'months').format('DD MMM YYYY');
            model.fromDate = date;
            model.todate = moment().format('DD MMM YYYY');
            restoreCustID = undefined;
            model.grid1.TotalRecords = 0;
            model.grid2.TotalRecords = 0;
            model.grid1 = {};
            model.grid2 = {};
            model.isDisabledsubmit = false;
        };

        model.regionChange = function(val) {
            model.branchArr = [];
            model.branchArr = Commondependency.branch(val);
        };

        model.commaSeperated = function(val) {
            return val && val.length > 0 ? val.join(',') : null;
        };
        model.onchangeemployee = function(val) {
            model.ProfileOwnerarray = [];
            model.ProfileOwnerarray = Commondependency.dependencyempnames((val !== undefined && val !== null && val !== "" && val !== 0 && val !== '0' && val.length > 0) ? (val).toString() : "");
        };
        model.saTemplate = function() {
            return "<a href='javascript:void(0);'>View SA Form</a>";
        };
        model.narrationTemplate = function() {
            return "<a href='javascript:void(0);'>View</a>";
        };

        model.showNarration = function(row) {
            alertss.timeoutoldalerts(model.scope, 'alert-success', row.settlenotes, 19500);
        };
        model.authorizerestore = function(row) {
            var authorize;
            authorize = "<a href='javascript:void(0);'>Authorize</a>";
            return authorize;
        };
        model.authorizepopup = function(row) {
            if (parseInt(model.empid) === 28 || parseInt(model.empid) === 330 || model.Managementid === 'true') {
                model.Bridegrrom = row.Genderid === 1 ? 'Bride' : 'Groom';
                model.oppsurnamename = row.OppSurName;
                model.oppProfileidoppname = row.OppName;
                model.oppFathername = row.OppFatherName;
                model.oppEducationname = row.OppEducation;
                model.oppProfession = row.OppProfession;
                model.oppjoblocation = row.OppJobLoc;
                model.oppauthoreason = row.deletenotes;
                model.Cust_DeleteDetails_ID = row.Cust_DeleteDetails_ID;
                modelpopupopenmethod.showPopupphotopoup('authozedeletepopup.html', model.scope, 'md', "modalclassdashboardphotopopup");
            } else {
                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please Contact Admin Employees', 4000);
            }
        };
        model.searchProfiles = function() {
            model.panelbodyhide = false;
            model.grid1.columns = [
                { text: 'Bride Profile ID', key: 'BrideProfileID', type: 'customlink', templateUrl: model.fromProfileIdTemplateDUrl, method: model.fromViewProfile },
                { text: 'Bride Name', key: 'BrideName', type: 'label' },
                { text: 'Bride Owner', key: 'BrideOwner', type: 'label' },
                { text: 'Groom Profile ID', key: 'GroomProfileID', type: 'customlink', templateUrl: model.toProfileIdTemplateDUrl, method: model.toViewProfile },
                { text: 'Groom Name', key: 'GroomName', type: 'label' },
                { text: 'Groom Owner', key: 'GroomOwner', type: 'label' },
                { text: 'Settled Date', key: 'SettledDate', type: 'label' },
                { text: 'Narriation', key: 'settlenotes', type: 'customlink', templateUrl: model.narrationTemplate, method: model.showNarration },
                { text: 'Engagement date', key: 'EngagementDate', type: 'label' },
                { text: 'Marriage date', key: 'MarriageDate ', type: 'label' },
                { text: 'Bride SAPaid', key: 'BridePaidstatus', type: 'label' },
                { text: 'Groom SAPaid', key: 'GroomPaidStatus', type: 'label' },
                { text: 'Settlement Form', key: '', type: 'customlink', templateUrl: model.saTemplate, method: model.showSAmethod },
                { text: 'AuthorizedByName', key: 'AuthorizedByName', type: 'label' },
                { text: 'Authorize date', key: 'Authorizedate', type: 'label' },
                { text: 'Settled By', key: 'settletedby', type: 'label' }
            ];

            model.grid2.columns = [
                { text: 'Profile ID', key: 'ProfileID', type: 'customlink', templateUrl: model.deleteProfileIdTemplateDUrl, method: model.deleteViewProfile },
                { text: 'Name', key: 'NAME', type: 'label' },
                { text: 'Deleted by', key: 'DeleteBy', type: 'label' },
                { text: 'Deleted Date', key: 'DeletedDate', type: 'label' },
                { text: 'Narriation', key: 'deletenotes', type: 'label' },
                { text: 'Authorized By', key: 'AuthorizedByEmpName', type: 'label' },
                { text: 'Authorized Date', key: 'Authoriseddate', type: 'label' },
                { text: 'Authorization', key: '', type: 'customlink', templateUrl: model.authorizerestore, method: model.authorizepopup }
            ];
            model.grid2.data = [];
            model.grid1.data = [];
            var inobj = {
                IsAdmin: model.Admin,
                strProfileID: model.profileID ? model.profileID : null,
                typeofStatus: model.rbtnsettleDeleteType === '0' ? 'B' : (model.rbtnsettleDeleteType === '1' ? 'S' : (model.rbtnsettleDeleteType === '2' ? 'D' : null)),
                AuthorizeStatus: null,
                Gender: model.rbtGender === '0' ? null : model.rbtGender,
                ProfileType: model.rbtntypeofProfile === '0' ? null : model.rbtntypeofProfile,
                StartDate: model.fromDate ? moment(model.fromDate).format('YYYY-MM-DD') : null,
                EndDate: model.todate ? moment(model.todate).format('YYYY-MM-DD') : null,
                IsConfidential: model.chkConfidential ? model.chkConfidential : null,
                strauthorizedBy: model.commaSeperated(model.authorizedby),
                strenteredBy: model.commaSeperated(model.settledeleteby),
                strBranch: model.commaSeperated(model.branch),
                strCaste: model.commaSeperated(model.caste),
                strProfileOwnerId: model.commaSeperated(model.profileOwner),
                i_Regionfield: model.region ? model.region : null,
                StartIndex: null,
                EndIndex: null
            };

            model.grid1.gridTableshow = true;
            settleDeleteProfileseReportService.ProfileDeleteProfilesReport(inobj).then(function(response) {
                model.isDisabledsubmit = false;
                if (response.data) {
                    // if (model.rbtnsettleDeleteType === "0") {
                    if (inobj.typeofStatus === 'B') {
                        model.grid1.data = response.data[0].length > 0 ? response.data[0] : [];
                        model.grid1.TotalRecords = response.data[0].length > 0 ? response.data[0].length : 0;
                        model.grid2.data = response.data[1].length > 0 ? response.data[1] : [];
                        model.grid2.TotalRecords = response.data[1].length > 0 ? response.data[1].length : 0;
                    } else if (inobj.typeofStatus === 'S') {
                        model.grid1.data = response.data[0].length > 0 ? response.data[0] : [];
                        model.grid1.TotalRecords = response.data[0].length > 0 ? response.data[0].length : 0;
                    } else {
                        model.grid2.data = response.data[0].length > 0 ? response.data[0] : [];
                        model.grid2.TotalRecords = response.data[0].length > 0 ? response.data[0].length : 0;
                    }

                    if (model.grid1.data.length === 0 && model.grid2.data.length === 0) {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No records found', 19500);
                        model.panelbodyhide = true;
                    }

                } else {

                }
            });
        };


        model.closepopup = function() {
            modelpopupopenmethod.closepopuppoptopopup();
        };

        model.close = function() {
            modelpopupopenmethod.closepopup();
        };

        model.RelationshipChange = function(ID, RelationshipID) {
            SelectBindServiceApp.getEIprofileID(3, ID, RelationshipID).then(function(response) {
                model.relationName = response.data[0][0].NAME;
            });
        };

        model.showSAmethod = function(row) {
            if (row.SettlementForm) {
                var imgArr = row.SettlementForm.replace(/\\/g, '/');
                model.image = app.GlobalImgPath + imgArr.substring(2);
                modelpopupopenmethod.showPopup('templates/bindImagePopup.html', model.scope, 'md', '');
            }
        };

        model.fromProfileIdTemplateDUrl = function(row) {
            var paidstatusclass = row.BridePaidstatus === 'Paid' ? 'paidclass' : 'unpaid';
            var paid = "<a class='" + paidstatusclass + "'>" + row.BrideProfileID + "</a>";
            return paid;
        };

        model.toProfileIdTemplateDUrl = function(row) {
            var paidstatusclass = row.GroomPaidStatus === 'Paid' ? 'paidclass' : 'unpaid';
            var paid = "<a class='" + paidstatusclass + "'>" + row.GroomProfileID + "</a>";
            return paid;
        };
        model.deleteProfileIdTemplateDUrl = function(row) {
            var paidstatusclass = row.PaidStatus === 1 ? 'paidclass' : 'unpaid';
            var paid = "<a class='" + paidstatusclass + "'>" + row.ProfileID + "</a>";
            return paid;
        };
        model.fromViewProfile = function(row) {

            window.open('/Viewfullprofile/' + row.BrideProfileID + '/0', '_blank');
        };
        model.toViewProfile = function(row) {
            window.open('/Viewfullprofile/' + row.GroomProfileID + '/0', '_blank');
        };
        model.deleteViewProfile = function(row) {
            window.open('/Viewfullprofile/' + row.ProfileID + '/0', '_blank');
        };

        model.Profileownerbind = function() {
            SelectBindServiceApp.EmpBinding(1, 2, '').then(function(response) {
                model.ProfileOwnerarray = [];
                _.each(response.data, function(item) {
                    if (item.CountryCode === 'Profile Owner') {
                        model.ProfileOwnerarray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                    }
                });

            });
        };
        model.authorizedeleteprofiles = function() {
            var inobj = {
                DelSurname: model.oppsurnamename !== '' && model.oppsurnamename !== null && model.oppsurnamename !== undefined ? model.oppsurnamename : '',
                DelName1: model.oppProfileidoppname !== '' && model.oppProfileidoppname !== null && model.oppProfileidoppname !== undefined ? model.oppProfileidoppname : '',
                DelFatherName: model.oppFathername !== '' && model.oppFathername !== null && model.oppFathername !== undefined ? model.oppFathername : '',
                DelEducation: model.oppEducationname !== '' && model.oppEducationname !== null && model.oppEducationname !== undefined ? model.oppEducationname : '',
                DelProfession: model.oppProfession !== '' && model.oppProfession !== null && model.oppProfession !== undefined ? model.oppProfession : '',
                DelRelationship: model.rbtopprelation !== '' && model.rbtopprelation !== null && model.rbtopprelation !== undefined ? parseInt(model.rbtopprelation) : '',
                Joblocation: model.oppjoblocation !== '' && model.oppjoblocation !== null && model.oppjoblocation !== undefined ? model.oppjoblocation : '',
                Narriation: model.oppauthoreason !== '' && model.oppauthoreason !== null && model.oppauthoreason !== undefined ? model.oppauthoreason : '',
                ID: parseInt(model.Cust_DeleteDetails_ID),
                AuthorizationStatus: 1
            };
            settleDeleteProfileseReportService.Updatedeletecustomerdetails_new(inobj).then(function(response) {
                console.log(response);
                if (response.data !== null && response.data !== undefined && parseInt(response.data) === 1) {
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Update Delete Details Sucessfully', 4000);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Update Delete Details faild', 4000);
                }
            });
        };
        return model;
    }
})();