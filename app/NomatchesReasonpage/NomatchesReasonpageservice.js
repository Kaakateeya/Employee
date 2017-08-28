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
                getnomatchesreason: function(v_EmpID, i_Region, v_Branch, i_flag, i_Cust_ID, v_Reason) {
                    return http.get(app.apiroot + 'EmployeeReportPage/getNomatchesreasons', {
                        params: {
                            v_EmpID: v_EmpID,
                            i_Region: i_Region,
                            v_Branch: v_Branch,
                            i_flag: i_flag,
                            i_Cust_ID: i_Cust_ID,
                            v_Reason: v_Reason
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