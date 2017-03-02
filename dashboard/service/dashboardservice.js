(function() {
    'use strict';

    function factory(http) {
        debugger;
        return {
            getlandingdata: function(empid, branchcode, frompage, topage, tablename) {
                return http.get(app.apiroot + 'CustomerPersonalUpdate/getEmplanding_counts_Admin', {
                    params: {
                        OwnerName: empid,
                        Branchname: branchcode,
                        StartIndex: frompage,
                        EndIndex: topage,
                        strTableType: tablename
                    }
                });
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('dashboardServices', factory);
    factory.$inject = ['$http'];
})();