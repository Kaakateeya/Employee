(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('matchMeetingCountReportModel', factory);

    factory.$inject = ['matchMeetingCountReportService', 'complex-grid-config', 'modelpopupopenmethod', 'single-grid-config', 'alert'];

    function factory(matchMeetingCountReportService, config, modelpopupopenmethod, singleconfig, alertss) {

        var model = {};
        model = config;
        model.singlegrid = singleconfig;
        model.scope = {};
        model.showpaging = false;
        model.data = [];
        model.scope = {};
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'mm-dd-yy'
        };
        model.viewTemplate = function(row) {
            return '<a href="javascript:void();">View</a>';
        };
        model.close = function() {
            modelpopupopenmethod.closepopuppoptopopup();
        };

        model.groomTemplate = function(row) {
            var paidstatusclass = row.GroomPaidSatus === 1 ? 'paidclass' : 'unpaid';
            var paid = "<a class='" + paidstatusclass + "' href='javascript:void(0);' ng-click='model.viewProfile(" + JSON.stringify(row.GroomProfileID) + ");'>" + row.GroomProfileID + "</a>";
            return paid;

        };
        model.brideTemplate = function(row) {
            var paidstatusclass = row.BridePaidSatus === 1 ? 'paidclass' : 'unpaid';
            var paid = "<a class='" + paidstatusclass + "' href='javascript:void(0);' ng-click='model.viewProfile(" + JSON.stringify(row.BrideProfileID) + ");'>" + row.BrideProfileID + "</a>";
            return paid;
        };

        model.singlegrid.viewProfile = function(profileID) {
            window.open('/Viewfullprofile/' + profileID + '/0', '_blank');
        };

        model.viewmmInfo = function(row) {
            model.singlegrid.showsearchrows = true;
            model.singlegrid.showsearch = false;
            model.singlegrid.showpaging = false;
            model.singlegrid.showClientpaging = false;
            model.singlegrid.myprofileexcel = false;
            model.singlegrid.normalexcel = false;
            model.singlegrid.gridTableshow = true;



            var inobj = {};
            if (model.rbtnSearchBy === '0') {
                inobj.Empid = row.EmployeeId;
                model.singlegrid.columns = [
                    { text: 'Employee name', key: 'EMPName', type: 'label' },
                    { text: 'Groom profileID', key: 'GroomProfileID', type: 'morelinks', templateUrl: model.groomTemplate },
                    { text: 'Bride profileID', key: 'BrideProfileID', type: 'morelinks', templateUrl: model.brideTemplate },
                    { text: 'Groom profile owner', key: 'GroomProfileOwner', type: 'label' },
                    { text: 'Groom name	', key: 'GroomProfileName', type: 'label' },
                    { text: 'Bride profile owner', key: 'BrideProfileOwner', type: 'label' },
                    { text: 'Bride name', key: 'BrideProfileName', type: 'label' },
                    { text: 'MM notes', key: 'MeetingNotes', type: 'label' },
                    { text: 'Bride status', key: 'BStatus', type: 'label' },
                    { text: 'Groom status', key: 'GStatus', type: 'label' },
                    { text: 'MM date', key: 'MeetingDate', type: 'label' }
                ];

            } else if (model.rbtnSearchBy === '1') {
                inobj.custid = row.CustomerID;

                model.singlegrid.columns = [
                    { text: 'Bride profileID', key: 'BrideProfileID', type: 'morelinks', templateUrl: model.brideTemplate },
                    { text: 'Groom profileID', key: 'GroomProfileID', type: 'morelinks', templateUrl: model.groomTemplate },
                    { text: 'MM date', key: 'MeetingDate', type: 'label' },
                    { text: 'MM arangedby Emp', key: 'MeetingArrangedByEmp_ID', type: 'label' },
                    { text: 'Bride status', key: 'BStatus', type: 'label' },
                    { text: 'Groom status', key: 'GStatus', type: 'label' },
                    { text: 'MM notes', key: 'MeetingNotes', type: 'label' },
                    { text: 'GPO', key: 'GPO', type: 'label' },
                    { text: 'BPO', key: 'BPO', type: 'label' }
                ];

            } else if (model.rbtnSearchBy === '2') {
                inobj = {
                    MMCustID: row.BrideProfile_ID,
                    MMCustID2: row.GroomProfile_ID
                };

                model.singlegrid.columns = [
                    { text: 'Bride profileID', key: 'BrideProfileID', type: 'morelinks', templateUrl: model.brideTemplate },
                    { text: 'Bride name', key: 'BrideProfileName', type: 'label' },
                    { text: 'Groom profileID', key: 'GroomProfileID', type: 'morelinks', templateUrl: model.groomTemplate },
                    { text: 'Groom name', key: 'GroomProfileName', type: 'label' },
                    { text: 'MM date', key: 'MeetingDate', type: 'label' },
                    { text: 'MM arranged by EmpID', key: 'MeetingArrangedByEmp_ID', type: 'label' },
                    { text: 'Bride status', key: 'BStatus', type: 'label' },
                    { text: 'Groom status', key: 'GStatus', type: 'label' },
                    { text: 'MM notes', key: 'MeetingNotes', type: 'label' },
                    { text: 'GPO', key: 'GPO', type: 'label' },
                    { text: 'BPO', key: 'BPO', type: 'label' }
                ];

            }

            matchMeetingCountReportService.matchMeetingCountInfo(inobj).then(function(response) {
                model.singlegrid.sdata = response.data[0];
            });

            modelpopupopenmethod.showPopupphotopoup('mmInfoPopup.html', model.scope, 'lg', "");
        };

        model.matchReport = function() {

            if (model.rbtnSearchBy === '0') {
                model.columns = [
                    { text: 'Sno', key: 'ID', type: 'label' },
                    { text: 'Employee name', key: 'Name', type: 'label' },
                    { text: 'Match meeting count', key: 'MeetingArrangedCount', type: 'label' },
                    { text: 'Branch', key: 'Branch', type: 'label' },
                    { text: 'view', key: '', type: 'customlink', templateUrl: model.viewTemplate, method: model.viewmmInfo }
                ];
            } else if (model.rbtnSearchBy === '1') {
                model.columns = [
                    { text: 'Sno', key: 'ID', type: 'label' },
                    { text: 'ProfileID', key: 'ProfileId', type: 'label' },
                    { text: 'Name', key: 'Name', type: 'label' },
                    { text: 'Match meeting count', key: 'MeetingCount', type: 'label' },
                    { text: 'Caste', key: 'Castename', type: 'label' },
                    { text: 'view', key: '', type: 'customlink', templateUrl: model.viewTemplate, method: model.viewmmInfo }
                ];
            } else if (model.rbtnSearchBy === '2') {
                model.columns = [
                    { text: 'Sno', key: 'ID', type: 'label' },
                    { text: 'Bride profileID', key: 'BrideCust_ID', type: 'label' },
                    { text: 'Groom profileID', key: 'GroomCust_ID', type: 'label' },
                    { text: 'Match meeting count', key: 'MatchMeetingCount', type: 'label' },
                    { text: 'view', key: '', type: 'customlink', templateUrl: model.viewTemplate, method: model.viewmmInfo }
                ];
            }










            var inobj = {
                AppusrID: 0,
                SearchBy: model.rbtnSearchBy ? model.rbtnSearchBy : 0,
                count: model.rbtnCount === '2' ? 'b' : 'm',
                Countfrom: model.countFrom ? model.countFrom : null,
                CountTo: model.countTo ? model.countTo : null,
                Dcount: 0,
                FromDate: model.txtFrommeetingDate ? moment(model.txtFrommeetingDate).format('YYYY-MM-DD') : null,
                toDate: model.txtTomeetingDate ? moment(model.txtTomeetingDate).format('YYYY-MM-DD') : null,
                strBranch: model.branch && model.branch.length > 0 ? model.branch.join(',') : null,
                strCaste: model.caste && model.caste.length > 0 ? model.caste.join(',') : null,
                SerialnoFrom: null,
                serialnoto: null
            };

            matchMeetingCountReportService.matchMeetingCountReport(inobj).then(function(response) {
                if (response.data && response.data[0] !== undefined && response.data[0].length > 0) {
                    model.data = response.data[0];
                    model.TotalRows = response.data[0].length;
                    model.opendiv = false;
                } else {
                    model.data = [];
                    model.TotalRows = 0;
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'no data found', 4500);
                }
            });
        };

        model.reset = function() {
            model.TotalRows = undefined;
            model.opendiv = true;
            model.caste = [402];
            model.branch = ["319", "320", "321", "322", "323", "324", "325", "326", "328", "329", "330", "331", "332", "333", "334", "335", "336", "337", "338", "339", "340", "341", "342", "343", "344"];
            model.rbtnSearchBy = '0';
            model.rbtnCount = '';
            model.countFrom = '';
            model.countTo = '';
            model.txtFrommeetingDate = '';
            model.txtTomeetingDate = '';
            model.data = [];
        };

        return model;

    }
})();