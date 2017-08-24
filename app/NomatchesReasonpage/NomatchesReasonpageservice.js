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
                getnomatchesreason: function(v_EmpID, i_Region, v_Branch) {
                    return http.get(app.apiroot + 'EmployeeReportPage/getNomatchesreasons', {
                        params: {
                            v_EmpID: v_EmpID,
                            i_Region: i_Region,
                            v_Branch: v_Branch
                        }
                    });
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