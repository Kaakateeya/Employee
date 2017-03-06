(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getlandingdata: function(empid, branchcode, frompage, topage, tablename, intLoadStatus) {
                return http.get(app.apiroot + 'CustomerPersonalUpdate/getEmplanding_counts_Admin', {
                    params: {
                        OwnerName: empid,
                        Branchname: branchcode,
                        StartIndex: frompage,
                        EndIndex: topage,
                        strTableType: tablename,
                        intLoadStatus: intLoadStatus
                    }
                });
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('dashboardServices', factory);
    factory.$inject = ['$http'];
})(angular);