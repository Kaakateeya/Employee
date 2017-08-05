(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('paymentOffersAssignnewService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            submitPaymentOffer: function(obj) {
                return http.post(app.apiroot + 'StaticPages/CustomerPaymentOffersAssign', obj);
            },
            selectbasedoncasteprofileid: function(profileid, casteid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getPaymentoffersbasedonselect', {
                    params: {
                        Profileid: profileid,
                        casteid: casteid
                    }
                });
            },
            Editdeletepaymentoffers: function(mobj) {
                return http.post(app.apiroot + 'EmployeeReportPage/Editanddeleteupdateoffers', mobj);
            }
        };
    }
})();