(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('NomatchesReasonpageService', ['$http', function(http) {
            return {
                getnomatchesreason: function(obj) {
                    return http.post(app.apiroot + 'EmployeeReportPage/Nomatchesreasons', obj);
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