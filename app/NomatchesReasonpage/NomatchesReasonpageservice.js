(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('NomatchesReasonpageService', ['$http', function(http) {
            return {
                getMyprofilebind: function(flag, ID) {
                    return http.get(app.apiroot + 'EmployeeReportPage/getMyProfileBindings', {
                        params: {
                            flag: flag,
                            ID: ID,
                        }
                    });
                },
                getnomatchesreason: function(obj) {
                    return http.post(app.apiroot + 'EmployeeReportPage/getNomatchesreasons', obj);
                },
                getdeletenomatchreason: function(Empid, Custid) {
                    return http.get(app.apiroot + 'EmployeeReportPage/getdeletenomatchreason', {
                        params: {
                            Empid: Empid,
                            Custid: Custid
                        }
                    });
                },
                Nomatchesreasoninsert: function(obj) {
                    return http.post(app.apiroot + 'EmployeeReportPage/InsertResonForNoService', obj);
                }
            };
        }]);
})();