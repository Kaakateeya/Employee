(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('settleDeleteProfileseReportModel', factory);

    factory.$inject = ['settleDeleteProfileseReportService', 'Commondependency', 'single-grid-config'];

    function factory(settleDeleteProfileseReportService, Commondependency, config) {

        var model = {};
        model = config;
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'mm-dd-yy'
        };
        model.reset = function() {
            model.opendiv = true;
            model.branchArr = Commondependency.branch('');
        };

        model.commaSeperated = function(val) {
            return val && val.length > 0 ? val.join(',') : null;
        };

        model.searchProfiles = function() {

            model.columns = [
                { text: 'Sno', key: 'ID', type: 'label' },
                { text: 'Employee name', key: 'Name', type: 'label' },
                { text: 'Match meeting count', key: 'MeetingArrangedCount', type: 'label' },
                { text: 'Branch', key: 'Branch', type: 'label' },
                { text: 'view', key: '', type: 'customlink', templateUrl: model.viewTemplate, method: model.viewmmInfo }
            ];
            var inobj = {
                IsAdmin: model.Admin,
                strProfileID: model.profileID,
                typeofStatus: model.rbtnsettleDeleteType === '0' ? 'B' : (model.rbtnsettleDeleteType === '1' ? 'S' : (model.rbtnsettleDeleteType === '2' ? 'D' : null)),
                AuthorizeStatus: model.rbtnauthorizationStatus === '2' ? null : model.rbtnauthorizationStatus,
                Gender: model.rbtGender === '0' ? null : model.rbtGender,
                ProfileType: model.rbtntypeofProfile === '0' ? null : model.rbtntypeofProfile,
                StartDate: model.fromDate ? moment(model.fromDate).format('YYYY-MM-DD') : null,
                EndDate: model.todate ? moment(model.todate).format('YYYY-MM-DD') : null,
                IsConfidential: model.chkConfidential,
                strauthorizedBy: model.commaSeperated(model.authorizedby),
                strenteredBy: model.commaSeperated(model.settledeleteby),
                strBranch: model.commaSeperated(model.branch),
                strCaste: model.commaSeperated(model.caste),
                strProfileOwnerI: model.commaSeperated(model.profileOwner),
                i_Regionfield: model.rbtnregion ? model.rbtnregion : null,
                StartIndex: null,
                EndIndex: null
            };
            settleDeleteProfileseReportService.ProfileDeleteProfilesReport(inobj).then(function() {

            });
        };
        return model;
    }
})();