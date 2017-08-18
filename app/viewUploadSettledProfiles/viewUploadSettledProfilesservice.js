(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('viewUploadSettledProfilesService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            submitUpload: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/uploadSettlementForm', obj);
            },
            checkProfileID: function(profileid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getcheckSettlementProfileID', { params: { profileID: profileid } });
            },
            getViewSettlementform: function(profileid) {
                return http.get(app.apiroot + 'StaticPages/getViewSettlementform', { params: { Profileid: profileid } });
            },
            getCheckprofileIDstatus: function(profileid) {
                return http.get(app.apiroot + 'StaticPages/getCheckprofileIDSelect', { params: { Profileid: profileid } });
            },
            deleteSettleForm: function(settleid) {
                return http.get(app.apiroot + 'smallPages/getdeleteSettleForm', { params: { settleID: settleid } });
            }
        };
    }
})();