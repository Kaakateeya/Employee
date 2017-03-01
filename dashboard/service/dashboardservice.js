(function() {
    'use strict';

    function factory(http) {
        debugger;
        return {
            getlandingdata: function() {
                return http.get(app.apiroot + 'CustomerPersonalUpdate/getEmplanding_counts_Admin', {
                    params: {
                        OwnerName: "2",
                        Branchname: "319",
                        StartIndex: 1,
                        EndIndex: 5,
                        strTableType: ''
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