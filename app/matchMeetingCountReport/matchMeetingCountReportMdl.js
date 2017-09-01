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
        model.viewTemplate = function(row) {
            return '<a href="javascript:void();">View</a>';
        };
        model.close = function() {
            modelpopupopenmethod.closepopuppoptopopup();
        };

        model.viewmmInfo = function(row) {
            model.singlegrid.showsearchrows = true;
            model.singlegrid.showsearch = false;
            model.singlegrid.showpaging = false;
            model.singlegrid.showClientpaging = false;
            model.singlegrid.myprofileexcel = false;
            model.singlegrid.normalexcel = false;
            model.singlegrid.gridTableshow = true;
            model.singlegrid.columns = [
                { text: 'Employee name', key: 'EMPName', type: 'label' },
                { text: 'Groom profileID', key: 'GroomProfileID', type: 'label' },
                { text: 'Bride profileID', key: 'BrideProfileID', type: 'label' },
                { text: 'Groom profile owner', key: 'GroomProfileOwner', type: 'label' },
                { text: 'Groom name	', key: 'GroomProfileName', type: 'label' },
                { text: 'Bride profile owner', key: 'BrideProfileOwner', type: 'label' },
                { text: 'Bride name', key: 'BrideProfileName', type: 'label' },
                { text: 'MM notes', key: 'MeetingNotes', type: 'label' },
                { text: 'Bride status', key: 'BStatus', type: 'label' },
                { text: 'Groom status', key: 'GStatus', type: 'label' },
                { text: 'MM date', key: 'MeetingDate', type: 'label' }
            ];
            var inobj = {
                Empid: row.EmployeeId
            };

            matchMeetingCountReportService.matchMeetingCountInfo(inobj).then(function(response) {
                model.singlegrid.sdata = response.data[0];
            });

            modelpopupopenmethod.showPopupphotopoup('mmInfoPopup.html', model.scope, 'lg', "");
        };

        model.matchReport = function() {
            model.columns = [
                { text: 'Sno', key: 'ID', type: 'label' },
                { text: 'Employee name', key: 'Name', type: 'label' },
                { text: 'Match meeting count', key: 'MeetingArrangedCount', type: 'label' },
                { text: 'Branch', key: 'Branch', type: 'label' },
                { text: 'view', key: '', type: 'customlink', templateUrl: model.viewTemplate, method: model.viewmmInfo }
            ];

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